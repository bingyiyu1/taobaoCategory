/**
 * Created by wangxuelei on 2018/7/26.
 */
'use strict';
const fs = require('fs');
const pidJson = require('../data/pid');
const multiPid = require('../data/multiPid');
const _= require('lodash');

(async()=> {
  _.forEach(pidJson,(v,k)=>{
    if( _.isArray(v)){
      multiPid[k]= v
    }
  });
  await fs.writeFileSync(`../data/vid.json`,JSON.stringify(multiPid));
})();