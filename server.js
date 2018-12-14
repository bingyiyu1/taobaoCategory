/**
 * Created by wangxuelei on 2018/12/11.
 */
'use strict';

const app = require('./app');
const connectRedis = require('util/connectRedis');
connectRedis({create:true})


const server = require('http').createServer(app);

const PORT_ADMIN = process.env.PORT_ADMIN || process.env.PORT || 4010;
server.listen(PORT_ADMIN);

console.log(`Admin server start on ${PORT_ADMIN}`);
