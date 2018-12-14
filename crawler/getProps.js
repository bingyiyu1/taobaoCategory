/**
 * Created by wangxuelei on 2018/7/26.
 */
'use strict';
const _ = require('lodash');
const crawler = require('./crawler');

const leaves = require('../data/leaves');
// const leaves = {leaves:[50019103]};

const getProps = async (leaves) => {
  const cid = leaves.shift();
  await crawler.getProps(cid);
  console.log(cid);
  if (!_.isEmpty(leaves)) {
    await getProps(leaves);
  } else {
    console.log('finish');
  }
};

(async () => {
  await getProps(leaves.leaves);
})();
