'use strict';

const Promise = require('bluebird');
const iconv = require('iconv-lite');
const co = require('co');
const path = require('path');
const csvParser = require('csv-parser');
const fs = require('fs');

const pid = require('../data/pid-origin');
const vid = require('../data/vid');

const colorPid = '1627207';

class Parser {
  parse(file) {
    const self = this;
    return co(function* () {
      let sheet;
      if (path.extname(file) === '.csv') {
        sheet = yield self.readCSV(file);
      }
      if (!sheet.length) {
        throw new Error('error');
      }
      return self.parseSheet(sheet);
    });
  }

  /**
   * 检测表头
   * @param headerSign 表头标记正则数组,可以适当少写几个只要能够保证唯一就行
   * @param rows 二维表
   * @returns {*}
   */
  detectedHeader(headerSign, rows) {
    let headerIndex;
    rows.some((row, index) => {
      if (headerSign.every(sign => {
        return rows[index].some(r => {
          return sign.test(r);
        });
      })) {
        headerIndex = index;
        return true;
      }
    });
    if (!headerIndex) {
      throw new Error('未找到表头');
    }
    return headerIndex;
  }

  parseSheet(rows) {
    const self = this;
    const headerIndex = self.detectedHeader([/title/, /cid/, /seller_cids/], rows);
    const header = rows[headerIndex];
    const body = rows.slice(headerIndex + 2).filter(r => r.length);
    const map = self.findIndexMap(header);
    return body.map(row => {
      const { productImage, pictures, colorMap } = self.parsePicture(row, map);
      const data = {
        name: row[map.title],
        extra: {
          merchantSerialNo: row[map.outer_id],
          description: row[map.description],
        },
        brandInfo: {
          name: self.parseCateProps(row, map)
        },
        productImage,
        pictures,
        support: self.assembleSupport(row, map),
        deliveryAddress: self.assembleDeliveryAddress(row, map),
        price: parseFloat(row[map.price]),
        stockCount: parseInt(row[map.num], 10),
        productLink: `https://item.taobao.com/item.htm?id=${row[map.num_id]}`
      };
      const { martProducts, skuStyles } = self.parseSkuProps(row, map, productImage, colorMap);
      data.martProducts = martProducts;
      if (skuStyles) {
        data.skuStyles = skuStyles;
      }
      return data;
    });
  }

  /**
   * 解析SkuProps
   * @param row
   * @param map
   * @param productImage
   * @param colorMap
   */
  parseSkuProps(row, map, productImage, colorMap) {
    const skuProps = row[map.skuProps];
    const skuBarcode = row[map.skuBarcode] || '';
    const inputCustomCpv = row[map.inputCustomCpv] || '';
    const cpvMap = {};
    const skuBarcodeArray = skuBarcode.split(';');
    const martProducts = [];
    const skuStyles = [];
    // 没有skuProps的情况下直接取值后return
    if (!skuProps) {
      martProducts.push({
        barcode: row[map.barcode],
        stockCount: parseInt(row[map.num], 10),
        price: parseFloat(row[map.price]),
        img: productImage,
      });
      return { martProducts };
    }
    // 检查是否二级sku
    const regExp = /[^;:]*:[^;:]*:[^;:]*:[^;:]*:[^;:]*;[^;:]*:[^;:]*;/;
    const skuPropsArray = skuProps.split(/;/);
    // 字符串以分号结尾的情况下回解析出一个空字符串,把他出栈
    if (!skuPropsArray[skuPropsArray.length - 1]) {
      skuPropsArray.pop();
    }
    let concatSkuPropsArray = [];
    // 如果是2级sku,则两两合并
    if (regExp.test(skuProps)) {
      const vernier = Array.from({ length: Math.floor(skuPropsArray.length / 2) }, (v, k) => k);
      vernier.forEach(v => {
        concatSkuPropsArray.push(`${skuPropsArray[2 * v]}:${skuPropsArray[2 * v + 1]}`);
      });
    } else {
      concatSkuPropsArray = skuPropsArray;
    }

    /**
     * 构建自定义属性map
     */
    if (inputCustomCpv) {
      const inputCustomCpvArray = inputCustomCpv.split(';');
      inputCustomCpvArray.forEach(cpv => {
        const [A, B, C] = cpv.split(':');
        cpvMap[A] = cpvMap[A] || {};
        cpvMap[A][B] = C;
      });
    }

    const skuStylel1 = {
      entries: []
    };
    const skuStylel2 = {
      entries: []
    };

    const processedVid = [];
    concatSkuPropsArray.forEach((skuProp, index) => {
      const martProduct = {};
      const [A, B, C, D, E, F, G] = skuProp.split(':');
      martProduct.price = parseFloat(A);
      martProduct.stockCount = parseInt(B, 10);
      martProduct.serialNo = C;
      martProduct.barcode = skuBarcodeArray[index];

      if (index === 0) {
        if (D === colorPid) {
          skuStylel1.needSpecImg = !!Object.keys(colorMap).length;
        }
        skuStylel1.category = pid[D];
        skuStylel1.lv = 1;
      }
      if (skuStylel1.needSpecImg && colorMap[E]) {
        martProduct.img = colorMap[E];
      }
      const name1 = vid[E] || (cpvMap[D] && cpvMap[D][E]) || '';
      // 取属性名
      if (!processedVid.includes(E)) {
        const entry1 = (skuStylel1.needSpecImg && colorMap[E]) ? {
          name: name1,
          img: colorMap[E]
        } : { name: name1 };
        skuStylel1.entries.push(entry1);
        processedVid.push(E);
      }

      let name2;
      if (F) {
        if (index === 0) {
          if (F === colorPid) {
            skuStylel2.needSpecImg = !!Object.keys(colorMap).length;
            skuStylel2.lv = 1;
            skuStylel1.lv = 2;
          } else {
            skuStylel2.lv = 2;
          }
          skuStylel2.category = pid[F];
        }
        if (skuStylel2.needSpecImg && colorMap[G]) {
          martProduct.img = colorMap[G];
        }
        // 取属性名
        name2 = vid[G] || (cpvMap[F] && cpvMap[F][G]) || '';
        if (!processedVid.includes(E)) {
          const entry2 = (skuStylel2.needSpecImg && colorMap[G]) ? {
            name: name2,
            img: colorMap[G] 
          } : { name: name2 };
          skuStylel2.entries.push(entry2);
        }
      }
      // 添加商品规格
      martProduct.spec = skuStylel2.lv ? (skuStylel2.lv === 1 ? `${name2}/${name1}` : `${name1}/${name2}`) : name1;
      martProduct.skuStyles = [];
      martProduct.skuStyles.push(skuStylel1.needSpecImg
        ? {
          lv: skuStylel1.lv,
          name: name1,
          img: martProduct.img 
        }
        : {
          lv: skuStylel1.lv,
          name: name1 
        });
      if (skuStylel2.lv) {
        martProduct.skuStyles.push(skuStylel2.needSpecImg ? {
          lv: skuStylel2.lv,
          name: name2,
          img: martProduct.img
        } : {
          lv: skuStylel2.lv,
          name: name2
        });
      }
      martProducts.push(martProduct);
    });
    [skuStylel1, skuStylel2].forEach(s => {
      if (s.lv) {
        skuStyles.push(s);
      }
    });
    return {
      martProducts,
      skuStyles 
    };
  }

  /**
   * 解析cateProps
   * @param row
   * @param map
   */
  parseCateProps(row, map) {
    const cateProps = row[map.cateProps];
    const catePropsArray = cateProps.split(';');
    const brandProp = catePropsArray.find(prop => {
      return /20000/.test(prop);
    });
    return brandProp ? brandProp.replace('20000:', '') : '';
  }

  /**
   * 解析cateProps
   * @param row
   * @param map
   */
  parsePicture(row, map) {
    const pictureString = row[map.picture];
    const pictureArray = pictureString.split(';');
    let productImage = '';
    const pictures = [];
    const colorMap = {};
    pictureArray.forEach(p => {
      const codeAndPicture = p.split('|');
      const code = codeAndPicture[0];
      const picture = codeAndPicture[1];
      const codes = code.split(':');
      if (codes[1] === '1') {
        if (codes[2] === '0') {
          productImage = picture;
        } else {
          pictures.push(picture);
        }
      }
      if (codes[1] === '2') {
        if (!code.includes('1627207')) {
          throw new Error('未找到颜色图片');
        }
        colorMap[codes[4]] = picture;
      }
    });
    return {
      productImage,
      pictures,
      colorMap 
    };
  }

  /**
   * 组装发货地址
   * @param row
   * @param map
   */
  assembleDeliveryAddress(row, map) {
    const country = row[map.global_stock_country];
    const province = row[map.location_state];
    const city = row[map.location_city];
    if (country && country !== '中国') {
      return {
        country
      };
    }
    return {
      country: '中国',
      province,
      city
    };
  }

  /**
   * 组装发货地址
   * @param row
   * @param map
   */
  assembleSupport(row, map) {
    const refundable = !!row[map.newprepay];
    return refundable ? { refundable } : {
      refundable,
      refundableLabel: '特殊商品，不支持7天无理由退换货' 
    };
  }


  /**
   * 获取表头{key:index}的map用于定位属性
   * @param header
   * @returns {{title: (number|*), outer_id: (number|*), global_stock_country: (number|*), location_state: (number|*),
   *   location_city: (number|*), price: (number|*), num: (number|*), description: (number|*), cateProps: (number|*),
   *   picture: (number|*), skuProps: (number|*), inputCustomCpv: (number|*), barcode: (number|*), skuBarcode:
   *   (number|*), newprepay: (number|*)}}
   */
  findIndexMap(header) {
    return {
      // 商品名称
      title: this.findFirst(header, ['title']),
      // 编号
      outer_id: this.findFirst(header, ['outer_id']),
      // 数字id
      num_id: this.findFirst(header, ['num_id']),
      // 国家
      global_stock_country: this.findFirst(header, ['global_stock_country']),
      // 省
      location_state: this.findFirst(header, ['location_state']),
      // 市
      location_city: this.findFirst(header, ['location_city']),
      // 展示价格
      price: this.findFirst(header, ['price']),
      // 总库存
      num: this.findFirst(header, ['num']),
      // 商品描述
      description: this.findFirst(header, ['description']),
      // 类目
      cateProps: this.findFirst(header, ['cateProps']),
      // 图片
      picture: this.findFirst(header, ['picture']),
      // sku属性
      skuProps: this.findFirst(header, ['skuProps']),
      // 自定义属性
      inputCustomCpv: this.findFirst(header, ['inputCustomCpv']),
      // 条形码
      barcode: this.findFirst(header, ['barcode']),
      // sku条形码
      skuBarcode: this.findFirst(header, ['skuBarcode']),
      // 退货支持
      newprepay: this.findFirst(header, ['newprepay']),
    };
  }

  /**
   *
   * @param header
   * @param keys - Column names
   */
  findFirst(header, keys) {
    let index;
    for (const key of keys) {
      const i = header.indexOf(key);
      if (i !== -1) {
        index = i;
        break;
      }
    }

    if (index !== undefined) {
      return index;
    }
    throw new Error(`excel标题格式不合法: ${header}\t不包含:${keys}`);
  }

  * readCSV(file) {
    return yield new Promise((resolve, reject) => {
      const data = [];
      fs.createReadStream(file)
        // csv 文件的格式是utf-16的
        .pipe(iconv.decodeStream('UTF-16'))
        .pipe(iconv.encodeStream('utf-8'))
        // 指定分割符为"\t",由于第一行只有一个元素version 1.00,解析的时候只会解析一列,这里指定了一个1-80的表头（实际属性长度是67）
        .pipe(csvParser({
          separator: '\t',
          headers: Array.from({ length: 80 }, (v, k) => k.toString())
        }))
        .on('data', (row) => {
          data.push(row);
        })
        .on('error', e => {
          reject(e);
        })
        .on('end', () => {
          const finalData = [];
          if (data.length) {
            finalData.push(Object.keys(data[0]).map(h => h.trim()));
            data.forEach(o => {
              finalData.push(Object.keys(data[0]).map(key => o[key]));
            });
          }
          resolve(finalData);
        });
    });
  }
}

module.exports = Parser;

(async () => {
  const p = new Parser();
  const data = await p.parse('./tb.csv');
  await fs.writeFileSync('./data.json', JSON.stringify(data));
})();
