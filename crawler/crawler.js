/**
 * Created by wangxuelei on 2018/7/25.
 */
'use strict';
const request = require('superagent');
const fs = require('fs');
const _ = require('lodash');

const URL = 'http://open.taobao.com/apitools/ajax_props.do';
const cookie = 'v=0; cookie2=169ac2178c19883c87bab60ee84a10d8; t=f386ab527ebc0dfc07e1eb01256db52b; _tb_token_=e743b83fb088f; cna=PJ/YE3TcLC4CAX13Z9D2VCH0; tracknick=%5Cu5317%5Cu6781%5Cu5929%5Cu7A7A%5Cu78CA; lgc=%5Cu5317%5Cu6781%5Cu5929%5Cu7A7A%5Cu78CA; dnk=%5Cu5317%5Cu6781%5Cu5929%5Cu7A7A%5Cu78CA; tg=0; mt=np=; unb=1606234411; uc1=cookie16=VFC%2FuZ9az08KUQ56dCrZDlbNdA%3D%3D&cookie21=W5iHLLyFeYZ1WM9hVnmS&cookie15=URm48syIIVrSKA%3D%3D&existShop=false&pas=0&cookie14=UoTfKfJ%2BrXLgTA%3D%3D&tag=8&lng=zh_CN; sg=%E7%A3%8A16; _l_g_=Ug%3D%3D; skt=17897d15fba78175; cookie1=WqJ70gxHyk5c4fA75CEr9%2BsXf39Vx%2BEq5kjV%2Bmr%2F1MI%3D; csg=4f671d8c; uc3=vt3=F8dBzrmVk7DDdhM60p4%3D&id2=Uoe0azTrsU2B%2Fw%3D%3D&nk2=0vR6T%2BVpY8D6uA%3D%3D&lg2=V32FPkk%2Fw0dUvg%3D%3D; existShop=MTUzMjUwOTUyNw%3D%3D; _cc_=URm48syIZQ%3D%3D; _nk_=%5Cu5317%5Cu6781%5Cu5929%5Cu7A7A%5Cu78CA; cookie17=Uoe0azTrsU2B%2Fw%3D%3D; isg=BK-vc8_2KH7BGCxCrwhXBbKVPsV5_Bfe777qaME8zp4gEMwSySRZxg2ClkCLaNvu; JSESSIONID=A6C70452C5F38CC8B7428FF1D1EDDC24; apush6ac6ef6616430cdd8acc491ddea4ab21=%7B%22ts%22%3A1532513670775%2C%22parentId%22%3A1532513462000%7D';
const _tb_token_ = 'e743b83fb088f';

const propPath = 'props.itemprops_get_response.item_props.item_prop';

const valuePath = 'propvalues.itempropvalues_get_response.prop_values.prop_value';

const getTb = async function (cid, act) {
  try {
    const res = await request.get(URL)
      .query({
        _tb_token_,
        act,
        cid,
        restBool: false
      })
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('cookie', cookie);
    return res.text;
  } catch (e) {

  }
};

const processed = require('../data/processed');

const getProps = async function (cid) {
  const path = `../data/props/${cid}.json`;
  // 如果没有被处理过
  if (!_.includes(processed.processed, cid)) {
    // 抓取数据
    let finalText = await getTb(cid, 'props');
    // 有属性
    if (_.includes(finalText, 'item_prop')) {
      // 使用正则将text转化为JSON
      finalText = _.replace(finalText, 'var props=', '"props":');
      finalText = _.replace(finalText, 'var propvalues=', ',"propvalues":');
      finalText = _.replace(finalText, /;/g, '');
      finalText = `{${finalText}}`;
      const file = JSON.parse(finalText);
      // 过滤出销售属性
      const is_sale_props = _.filter(_.get(file, propPath), { is_sale_prop: true });
      // 有销售属性则处理属性值
      if (!_.isEmpty(is_sale_props)) {
        const propsIds = _.map(is_sale_props, prop => {
          return prop.pid; 
        });
        const values = _.filter(_.get(file, valuePath), v => {
          return _.includes(propsIds, v.pid); 
        });
        _.set(file, propPath, is_sale_props);
        _.set(file, valuePath, values);
        _.set(file, 'cid', cid);
        await fs.writeFileSync(path, JSON.stringify(file));
      } else {
        console.log('is_sale_props is empty');
      }
    } else {
      console.log('item_prop is empty');
    }
    // 记录该cid已经处理过了
    processed.processed.push(cid);
    await fs.writeFileSync('../data/processed.json', JSON.stringify(processed));
  }
};

const getChildCid = async function (cid) {
  return getTb(cid, 'childCid');
};


module.exports = {
  getChildCid,
  getProps
};
