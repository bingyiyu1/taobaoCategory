#制定node镜像的版本
FROM node:8.14.0-jessie
#声明作者
MAINTAINER wang
#移动当前目录下面的文件到app目录下
ADD . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
RUN npm install
#安装pm2
RUN npm install pm2 -g
#对外暴露的端口
EXPOSE 4010
#程序启动脚本
CMD pm2 start server.js --no-daemon