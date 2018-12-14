/**
 * Created by wangxuelei on 2018/12/13.
 */
'use strict';
const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const port = 6379;
const client = redis.createClient(port, 'localhost');
client.select(0);


client.on('error', function (err) {
  console.log(`Error ${err}`);
});


module.exports = function (opt = {}) {
  if (opt.create) {
    return redis.createClient(port, 'localhost');
  }
  return client;
};
