/**
 * Created by wangxuelei on 2018/7/26.
 */
'use strict';
const crawler = require('./crawler');
const _ = require('lodash');

const leaves = require('../data/leaves');
// const leaves = {leaves:[50019103]};

(async()=> {
  while (!_.isEmpty(leaves.leaves)){
    let cid = leaves.leaves.shift();
    await crawler.getProps(cid);
  }
  if(_.isEmpty(leaves.leaves)){
    console.log('finish')
  }
})();