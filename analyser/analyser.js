/**
 * Created by wangxuelei on 2018/7/25.
 */
'use strict';
const _= require('lodash');
const pidJson = require('../data/pid');
const vidJson = require('../data/vid');
const fs = require('fs');
const path = require('path');

const get_is_sale_prop = async function(propsFile) {
  const path = 'props.itemprops_get_response.item_props.item_prop';
  const props = _.get(propsFile,path);
  const is_sale_props = _.filter(props,{is_sale_prop:true});
  is_sale_props.forEach(prop=>{
    const name = _.get(prop,'name','');
    if(pidJson[prop.pid] && !_.includes(pidJson[prop.pid],name) ){
      if(_.isString(pidJson[prop.pid])){
        pidJson[prop.pid] = [pidJson[prop.pid]]
      }
      pidJson[prop.pid].push(name);
      console.error('prop是会有冲突的',prop)
    }else {
      pidJson[prop.pid] = name ;
    }
  });
  await fs.writeFileSync(`../data/pid.json`,JSON.stringify(pidJson));
  return is_sale_props.map(prop => {return prop.pid});
};

const getPropValues = async function(propsFile,pids = []) {
  const path = 'propvalues.itempropvalues_get_response.prop_values.prop_value';
  const values = _.get(propsFile,path);
  const cid = _.get(propsFile, 'cid');
  pids.forEach(pid=>{
    const pValues = _.filter(values, {pid});
    pValues.forEach(value=>{
      const name = _.get(value,'name','');
      if(vidJson[value.vid] && vidJson[value.vid] !== name){
        console.error('value是会有冲突的',prop)
      }else {
        vidJson[value.vid] = name;
      }
    });
  });
  await fs.writeFileSync(`../data/vid.json`,JSON.stringify(vidJson));
};

const analysePropsFile = async function (propsFile) {
  const pids = await get_is_sale_prop(propsFile);
  // await getPropValues(propsFile,pids)
};

(async()=>{
  const files = await fs.readdirSync('../data/props/');
  for (let i in files){
    await analysePropsFile(require(path.join('../data/props', files[i])));
    console.log(i)
  }
})();