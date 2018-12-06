/**
 * Created by wangxuelei on 2018/7/26.
 */
'use strict';
const stack = require('../data/stack');
const leaves = require('../data/leaves');
const crawler = require('./crawler');
const _ = require('lodash');
const fs = require('fs');

(async()=> {
  while (!_.isEmpty(stack.stack)){
    let cid = stack.stack.shift();
    let text = await crawler.getChildCid(cid);
    const children = _.get(JSON.parse(text), 'itemcats_get_response.item_cats.item_cat')
    const parents = _.remove(children,{is_parent:true});
    if(!_.isEmpty(children)){
      const childrenCids = _.map(children, c => {return c.cid});
      leaves.leaves = _.concat(leaves.leaves,childrenCids);
    }
    if (!_.isEmpty(parents)) {
      const parentsCids = _.map(parents, p => {return p.cid});
      stack.stack = _.concat(stack.stack,parentsCids);
    }
    await fs.writeFileSync(`../data/stack.json`,JSON.stringify(stack));
    await fs.writeFileSync(`../data/leaves.json`,JSON.stringify(leaves));
  }
  if(_.isEmpty(stack.stack)){
    console.log('finish')
  }
})();