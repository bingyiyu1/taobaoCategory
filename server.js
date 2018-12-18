/**
 * Created by wangxuelei on 2018/12/11.
 */
'use strict';
const http = require('http');
const connectRedis = require('./util/connectRedis');

connectRedis({ create: true });


const app = require('./app');

const server = http.createServer(app);


const PORT_ADMIN = 4010;
server.listen(PORT_ADMIN);

console.log(`Admin server start on ${PORT_ADMIN}`);
