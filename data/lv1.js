/**
 * Created by wangxuelei on 2018/7/25.
 */
'use strict';
const fs = require('fs');

const lv1 = [
  {"cid": 121266001, "is_parent": true, "name": "众筹", "parent_cid": 0, "status": "normal"},
  {"cid": 120886001, "is_parent": true, "name": "公益", "parent_cid": 0, "status": "normal"},
  {"cid": 98, "is_parent": true, "name": "包装", "parent_cid": 0, "status": "normal"},
  {"cid": 120950002, "is_parent": true, "name": "天猫点券", "parent_cid": 0, "status": "normal"},
  {"cid": 50802001, "is_parent": true, "name": "数字阅读", "parent_cid": 0, "status": "normal"},
  {"cid": 120894001, "is_parent": true, "name": "淘女郎", "parent_cid": 0, "status": "normal"},
  {"cid": 50023722, "is_parent": true, "name": "隐形眼镜\/护理液", "parent_cid": 0, "status": "normal"},
  {"cid": 50026555, "is_parent": true, "name": "购物提货券", "parent_cid": 0, "status": "normal"},
  {"cid": 50026523, "is_parent": true, "name": "休闲娱乐", "parent_cid": 0, "status": "normal"},
  {"cid": 50008075, "is_parent": true, "name": "餐饮美食卡券", "parent_cid": 0, "status": "normal"},
  {"cid": 50019095, "is_parent": true, "name": "消费卡", "parent_cid": 0, "status": "normal"},
  {"cid": 50014927, "is_parent": true, "name": "教育培训", "parent_cid": 0, "status": "normal"},
  {"cid": 26, "is_parent": true, "name": "汽车\/用品\/配件\/改装", "parent_cid": 0, "status": "normal"},
  {"cid": 50020808, "is_parent": true, "name": "家居饰品", "parent_cid": 0, "status": "normal"},
  {"cid": 50020857, "is_parent": true, "name": "特色手工艺", "parent_cid": 0, "status": "normal"},
  {"cid": 50025707, "is_parent": true, "name": "度假线路\/签证送关\/旅游服务", "parent_cid": 0, "status": "normal"},
  {"cid": 50024099, "is_parent": true, "name": "电子元器件市场", "parent_cid": 0, "status": "normal"},
  {"cid": 30, "is_parent": true, "name": "男装", "parent_cid": 0, "status": "normal"},
  {"cid": 50008164, "is_parent": true, "name": "住宅家具", "parent_cid": 0, "status": "normal"},
  {"cid": 50020611, "is_parent": true, "name": "商业\/办公家具", "parent_cid": 0, "status": "normal"},
  {"cid": 50010788, "is_parent": true, "name": "彩妆\/香水\/美妆工具", "parent_cid": 0, "status": "normal"},
  {"cid": 1801, "is_parent": true, "name": "美容护肤\/美体\/精油", "parent_cid": 0, "status": "normal"},
  {"cid": 50023282, "is_parent": true, "name": "美发护发\/假发", "parent_cid": 0, "status": "normal"},
  {"cid": 1512, "is_parent": false, "name": "手机", "parent_cid": 0, "status": "normal"},
  {"cid": 14, "is_parent": true, "name": "数码相机\/单反相机\/摄像机", "parent_cid": 0, "status": "normal"},
  {"cid": 1201, "is_parent": false, "name": "MP3\/MP4\/iPod\/录音笔", "parent_cid": 0, "status": "normal"},
  {"cid": 1101, "is_parent": false, "name": "笔记本电脑", "parent_cid": 0, "status": "normal"},
  {"cid": 50019780, "is_parent": false, "name": "平板电脑\/MID", "parent_cid": 0, "status": "normal"},
  {"cid": 50018222, "is_parent": true, "name": "DIY电脑", "parent_cid": 0, "status": "normal"},
  {"cid": 11, "is_parent": true, "name": "电脑硬件\/显示器\/电脑周边", "parent_cid": 0, "status": "normal"},
  {"cid": 50018264, "is_parent": true, "name": "网络设备\/网络相关", "parent_cid": 0, "status": "normal"},
  {"cid": 50008090, "is_parent": true, "name": "3C数码配件", "parent_cid": 0, "status": "normal"},
  {"cid": 50012164, "is_parent": true, "name": "闪存卡\/U盘\/存储\/移动硬盘", "parent_cid": 0, "status": "normal"},
  {"cid": 50007218, "is_parent": true, "name": "办公设备\/耗材\/相关服务", "parent_cid": 0, "status": "normal"},
  {"cid": 50018004, "is_parent": true, "name": "电子词典\/电纸书\/文化用品", "parent_cid": 0, "status": "normal"},
  {"cid": 20, "is_parent": true, "name": "电玩\/配件\/游戏\/攻略", "parent_cid": 0, "status": "normal"},
  {"cid": 50022703, "is_parent": true, "name": "大家电", "parent_cid": 0, "status": "normal"},
  {"cid": 50011972, "is_parent": true, "name": "影音电器", "parent_cid": 0, "status": "normal"},
  {"cid": 50012100, "is_parent": true, "name": "生活电器", "parent_cid": 0, "status": "normal"},
  {"cid": 50012082, "is_parent": true, "name": "厨房电器", "parent_cid": 0, "status": "normal"},
  {"cid": 50002768, "is_parent": true, "name": "个人护理\/保健\/按摩器材", "parent_cid": 0, "status": "normal"},
  {"cid": 27, "is_parent": true, "name": "家装主材", "parent_cid": 0, "status": "normal"},
  {"cid": 124912001, "is_parent": false, "name": "合约机", "parent_cid": 0, "status": "normal"},
  {"cid": 50020332, "is_parent": true, "name": "基础建材", "parent_cid": 0, "status": "normal"},
  {"cid": 50020485, "is_parent": true, "name": "五金\/工具", "parent_cid": 0, "status": "normal"},
  {"cid": 50026535, "is_parent": true, "name": "医疗及健康服务", "parent_cid": 0, "status": "normal"},
  {"cid": 50020579, "is_parent": true, "name": "电子\/电工", "parent_cid": 0, "status": "normal"},
  {"cid": 50050471, "is_parent": true, "name": "婚庆\/摄影\/摄像服务", "parent_cid": 0, "status": "normal"},
  {"cid": 50011949, "is_parent": true, "name": "特价酒店\/特色客栈\/公寓旅馆", "parent_cid": 0, "status": "normal"},
  {"cid": 21, "is_parent": true, "name": "居家日用", "parent_cid": 0, "status": "normal"},
  {"cid": 50016349, "is_parent": true, "name": "厨房\/烹饪用具", "parent_cid": 0, "status": "normal"},
  {"cid": 50016348, "is_parent": true, "name": "家庭\/个人清洁工具", "parent_cid": 0, "status": "normal"},
  {"cid": 50008163, "is_parent": true, "name": "床上用品", "parent_cid": 0, "status": "normal"},
  {"cid": 35, "is_parent": true, "name": "奶粉\/辅食\/营养品\/零食", "parent_cid": 0, "status": "normal"},
  {"cid": 50014812, "is_parent": true, "name": "尿片\/洗护\/喂哺\/推车床", "parent_cid": 0, "status": "normal"},
  {"cid": 50022517, "is_parent": true, "name": "孕妇装\/孕产妇用品\/营养", "parent_cid": 0, "status": "normal"},
  {"cid": 50008165, "is_parent": true, "name": "童装\/婴儿装\/亲子装", "parent_cid": 0, "status": "normal"},
  {"cid": 50020275, "is_parent": true, "name": "传统滋补营养品", "parent_cid": 0, "status": "normal"},
  {"cid": 50002766, "is_parent": true, "name": "零食\/坚果\/特产", "parent_cid": 0, "status": "normal"},
  {"cid": 50016422, "is_parent": true, "name": "粮油米面\/南北干货\/调味品", "parent_cid": 0, "status": "normal"},
  {"cid": 121380001, "is_parent": true, "name": "国内机票\/国际机票\/增值服务", "parent_cid": 0, "status": "normal"},
  {"cid": 121536003, "is_parent": true, "name": "数字娱乐", "parent_cid": 0, "status": "normal"},
  {"cid": 121536007, "is_parent": true, "name": "全球购代购市场", "parent_cid": 0, "status": "normal"},
  {"cid": 40, "is_parent": true, "name": "腾讯QQ专区", "parent_cid": 0, "status": "normal"},
  {"cid": 50010728, "is_parent": true, "name": "运动\/瑜伽\/健身\/球迷用品", "parent_cid": 0, "status": "normal"},
  {"cid": 50013886, "is_parent": true, "name": "户外\/登山\/野营\/旅行用品", "parent_cid": 0, "status": "normal"},
  {"cid": 50011699, "is_parent": true, "name": "运动服\/休闲服装", "parent_cid": 0, "status": "normal"},
  {"cid": 25, "is_parent": true, "name": "玩具\/童车\/益智\/积木\/模型", "parent_cid": 0, "status": "normal"},
  {"cid": 50011665, "is_parent": true, "name": "网游装备\/游戏币\/帐号\/代练", "parent_cid": 0, "status": "normal"},
  {"cid": 50008907, "is_parent": true, "name": "手机号码\/套餐\/增值业务", "parent_cid": 0, "status": "normal"},
  {"cid": 99, "is_parent": true, "name": "网络游戏点卡", "parent_cid": 0, "status": "normal"},
  {"cid": 23, "is_parent": true, "name": "古董\/邮币\/字画\/收藏", "parent_cid": 0, "status": "normal"},
  {"cid": 50007216, "is_parent": true, "name": "鲜花速递\/花卉仿真\/绿植园艺", "parent_cid": 0, "status": "normal"},
  {"cid": 50004958, "is_parent": true, "name": "移动\/联通\/电信充值中心", "parent_cid": 0, "status": "normal"},
  {"cid": 50011740, "is_parent": true, "name": "流行男鞋", "parent_cid": 0, "status": "normal"},
  {"cid": 16, "is_parent": true, "name": "女装\/女士精品", "parent_cid": 0, "status": "normal"},
  {"cid": 50006843, "is_parent": true, "name": "女鞋", "parent_cid": 0, "status": "normal"},
  {"cid": 50006842, "is_parent": true, "name": "箱包皮具\/热销女包\/男包", "parent_cid": 0, "status": "normal"},
  {"cid": 1625, "is_parent": true, "name": "女士内衣\/男士内衣\/家居服", "parent_cid": 0, "status": "normal"},
  {"cid": 50010404, "is_parent": true, "name": "服饰配件\/皮带\/帽子\/围巾", "parent_cid": 0, "status": "normal"},
  {"cid": 50011397, "is_parent": true, "name": "珠宝\/钻石\/翡翠\/黄金", "parent_cid": 0, "status": "normal"},
  {"cid": 28, "is_parent": true, "name": "ZIPPO\/瑞士军刀\/眼镜", "parent_cid": 0, "status": "normal"},
  {"cid": 33, "is_parent": true, "name": "书籍\/杂志\/报纸", "parent_cid": 0, "status": "normal"},
  {"cid": 34, "is_parent": true, "name": "音乐\/影视\/明星\/音像", "parent_cid": 0, "status": "normal"},
  {"cid": 50017300, "is_parent": true, "name": "乐器\/吉他\/钢琴\/配件", "parent_cid": 0, "status": "normal"},
  {"cid": 29, "is_parent": true, "name": "宠物\/宠物食品及用品", "parent_cid": 0, "status": "normal"},
  {"cid": 2813, "is_parent": true, "name": "成人用品\/情趣用品", "parent_cid": 0, "status": "normal"},
  {"cid": 50012029, "is_parent": true, "name": "运动鞋new", "parent_cid": 0, "status": "normal"},
  {"cid": 50013864, "is_parent": true, "name": "饰品\/流行首饰\/时尚饰品新", "parent_cid": 0, "status": "normal"},
  {"cid": 50014811, "is_parent": true, "name": "网店\/网络服务\/软件", "parent_cid": 0, "status": "normal"},
  {"cid": 50023724, "is_parent": true, "name": "其他", "parent_cid": 0, "status": "normal"},
  {"cid": 50017652, "is_parent": true, "name": "TP服务商大类", "parent_cid": 0, "status": "normal"},
  {"cid": 50023575, "is_parent": true, "name": "房产\/租房\/新房\/二手房\/委托服务", "parent_cid": 0, "status": "normal"},
  {"cid": 50023717, "is_parent": true, "name": "OTC药品\/医疗器械\/计生用品", "parent_cid": 0, "status": "normal"},
  {"cid": 50023878, "is_parent": true, "name": "自用闲置转让", "parent_cid": 0, "status": "normal"},
  {"cid": 50024186, "is_parent": true, "name": "保险", "parent_cid": 0, "status": "normal"},
  {"cid": 50024612, "is_parent": true, "name": "阿里健康送药服务", "parent_cid": 0, "status": "normal"},
  {"cid": 50024971, "is_parent": true, "name": "新车\/二手车", "parent_cid": 0, "status": "normal"},
  {"cid": 50025004, "is_parent": true, "name": "个性定制\/设计服务\/DIY", "parent_cid": 0, "status": "normal"},
  {"cid": 50025110, "is_parent": true, "name": "电影\/演出\/体育赛事", "parent_cid": 0, "status": "normal"},
  {"cid": 50025618, "is_parent": true, "name": "理财", "parent_cid": 0, "status": "normal"},
  {"cid": 50025705, "is_parent": true, "name": "洗护清洁剂\/卫生巾\/纸\/香薰", "parent_cid": 0, "status": "normal"},
  {"cid": 50025968, "is_parent": true, "name": "司法拍卖拍品专用", "parent_cid": 0, "status": "normal"},
  {"cid": 50026316, "is_parent": true, "name": "咖啡\/麦片\/冲饮", "parent_cid": 0, "status": "normal"},
  {"cid": 50023804, "is_parent": true, "name": "装修设计\/施工\/监理", "parent_cid": 0, "status": "normal"},
  {"cid": 50026800, "is_parent": true, "name": "保健食品\/膳食营养补充食品", "parent_cid": 0, "status": "normal"},
  {"cid": 50050359, "is_parent": true, "name": "水产肉类\/新鲜蔬果\/熟食", "parent_cid": 0, "status": "normal"},
  {"cid": 50074001, "is_parent": true, "name": "摩托车\/装备\/配件", "parent_cid": 0, "status": "normal"},
  {"cid": 50158001, "is_parent": true, "name": "网络店铺代金\/优惠券", "parent_cid": 0, "status": "normal"},
  {"cid": 50230002, "is_parent": true, "name": "服务商品", "parent_cid": 0, "status": "normal"},
  {"cid": 50454031, "is_parent": true, "name": "景点门票\/演艺演出\/周边游", "parent_cid": 0, "status": "normal"},
  {"cid": 50468001, "is_parent": true, "name": "手表", "parent_cid": 0, "status": "normal"},
  {"cid": 50510002, "is_parent": true, "name": "运动包\/户外包\/配件", "parent_cid": 0, "status": "normal"},
  {"cid": 50008141, "is_parent": true, "name": "酒类", "parent_cid": 0, "status": "normal"},
  {"cid": 50734010, "is_parent": true, "name": "资产", "parent_cid": 0, "status": "normal"},
  {"cid": 50025111, "is_parent": true, "name": "本地化生活服务", "parent_cid": 0, "status": "normal"},
  {"cid": 121938001, "is_parent": false, "name": "淘点点预定点菜", "parent_cid": 0, "status": "normal"},
  {"cid": 121940001, "is_parent": false, "name": "淘点点现金券", "parent_cid": 0, "status": "normal"},
  {"cid": 122650005, "is_parent": true, "name": "童鞋\/婴儿鞋\/亲子鞋", "parent_cid": 0, "status": "normal"},
  {"cid": 122684003, "is_parent": true, "name": "自行车\/骑行装备\/零配件", "parent_cid": 0, "status": "normal"},
  {"cid": 122718004, "is_parent": true, "name": "家庭保健", "parent_cid": 0, "status": "normal"},
  {"cid": 122852001, "is_parent": true, "name": "居家布艺", "parent_cid": 0, "status": "normal"},
  {"cid": 122950001, "is_parent": true, "name": "节庆用品\/礼品", "parent_cid": 0, "status": "normal"},
  {"cid": 122952001, "is_parent": true, "name": "餐饮具", "parent_cid": 0, "status": "normal"},
  {"cid": 122928002, "is_parent": true, "name": "收纳整理", "parent_cid": 0, "status": "normal"},
  {"cid": 122966004, "is_parent": true, "name": "处方药", "parent_cid": 0, "status": "normal"},
  {"cid": 123536002, "is_parent": true, "name": "阿里通信专属类目", "parent_cid": 0, "status": "normal"},
  {"cid": 123500005, "is_parent": true, "name": "资产（政府类专用）", "parent_cid": 0, "status": "normal"},
  {"cid": 123690003, "is_parent": true, "name": "精制中药材", "parent_cid": 0, "status": "normal"},
  {"cid": 124024001, "is_parent": true, "name": "农业生产资料（农村淘宝专用）", "parent_cid": 0, "status": "normal"},
  {"cid": 124044001, "is_parent": true, "name": "品牌台机\/品牌一体机\/服务器", "parent_cid": 0, "status": "normal"},
  {"cid": 124050001, "is_parent": true, "name": "全屋定制", "parent_cid": 0, "status": "normal"},
  {"cid": 124242008, "is_parent": true, "name": "智能设备", "parent_cid": 0, "status": "normal"},
  {"cid": 124354002, "is_parent": true, "name": "电动车\/配件\/交通工具", "parent_cid": 0, "status": "normal"},
  {"cid": 124466001, "is_parent": true, "name": "农用物资", "parent_cid": 0, "status": "normal"},
  {"cid": 124468001, "is_parent": true, "name": "农机\/农具\/农膜", "parent_cid": 0, "status": "normal"},
  {"cid": 124470001, "is_parent": true, "name": "畜牧\/养殖物资", "parent_cid": 0, "status": "normal"},
  {"cid": 124470006, "is_parent": true, "name": "整车(经销商)", "parent_cid": 0, "status": "normal"},
  {"cid": 124484008, "is_parent": true, "name": "模玩\/动漫\/周边\/cos\/桌游", "parent_cid": 0, "status": "normal"},
  {"cid": 124458005, "is_parent": true, "name": "茶", "parent_cid": 0, "status": "normal"},
  {"cid": 124568010, "is_parent": true, "name": "室内设计师", "parent_cid": 0, "status": "normal"},
  {"cid": 124750013, "is_parent": true, "name": "俪人购(俪人购专用)", "parent_cid": 0, "status": "normal"},
  {"cid": 124698018, "is_parent": true, "name": "装修服务", "parent_cid": 0, "status": "normal"},
  {"cid": 124844002, "is_parent": true, "name": "拍卖会专用", "parent_cid": 0, "status": "normal"},
  {"cid": 124868003, "is_parent": true, "name": "盒马", "parent_cid": 0, "status": "normal"},
  {"cid": 124852003, "is_parent": true, "name": "二手数码", "parent_cid": 0, "status": "normal"},
  {"cid": 125102006, "is_parent": true, "name": "到家业务", "parent_cid": 0, "status": "normal"},
  {"cid": 125406001, "is_parent": true, "name": "享淘卡", "parent_cid": 0, "status": "normal"},
  {"cid": 126040001, "is_parent": true, "name": "橙运", "parent_cid": 0, "status": "normal"},
  {"cid": 126252002, "is_parent": true, "name": "门店O2O", "parent_cid": 0, "status": "normal"},
  {"cid": 126488005, "is_parent": true, "name": "天猫零售O2O", "parent_cid": 0, "status": "normal"},
  {"cid": 126488008, "is_parent": true, "name": "阿里健康B2B平台", "parent_cid": 0, "status": "normal"},
  {"cid": 126602002, "is_parent": true, "name": "生活娱乐充值", "parent_cid": 0, "status": "normal"},
  {"cid": 126700003, "is_parent": true, "name": "家装灯饰光源", "parent_cid": 0, "status": "normal"},
  {"cid": 126762001, "is_parent": true, "name": "美容美体仪器", "parent_cid": 0, "status": "normal"},
  {"cid": 127076003, "is_parent": true, "name": "平台充值活动(仅内部店铺)", "parent_cid": 0, "status": "normal"},
  {"cid": 127492006, "is_parent": true, "name": "标准件\/零部件\/工业耗材", "parent_cid": 0, "status": "normal"},
  {"cid": 127484003, "is_parent": true, "name": "润滑\/胶粘\/试剂\/实验室耗材", "parent_cid": 0, "status": "normal"},
  {"cid": 127508003, "is_parent": true, "name": "机械设备", "parent_cid": 0, "status": "normal"},
  {"cid": 127458007, "is_parent": true, "name": "搬运\/仓储\/物流设备", "parent_cid": 0, "status": "normal"},
  {"cid": 127442006, "is_parent": true, "name": "纺织面料\/辅料\/配套", "parent_cid": 0, "status": "normal"},
  {"cid": 127450004, "is_parent": true, "name": "金属材料及制品", "parent_cid": 0, "status": "normal"},
  {"cid": 127452002, "is_parent": true, "name": "橡塑材料及制品", "parent_cid": 0, "status": "normal"},
  {"cid": 127588002, "is_parent": true, "name": "阿里云云市场", "parent_cid": 0, "status": "normal"},
  {"cid": 127878006, "is_parent": true, "name": "新制造", "parent_cid": 0, "status": "normal"},
  {"cid": 127882008, "is_parent": true, "name": "菜鸟驿站生活店", "parent_cid": 0, "status": "normal"},
  {"cid": 127924022, "is_parent": true, "name": "零售通", "parent_cid": 0, "status": "normal"}
];

fs.writeFileSync(`../data/stack.js`,lv1.map(l=>{
  return l.cid
}));