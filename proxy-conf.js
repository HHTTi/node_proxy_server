const path = require("path");

//代理配置
const conifg = {
  // rootPath: 代理的html文件路径 path.join(__dirname, "你的相对项目路径") 
  rootPath: path.join(__dirname, "../yhec-h5"),
  // port 指定服务端口 启动后服务器为 http://localhost:8080/
  port: 8080,
  // 代理请求配置
  proxys:[
    { key:'/app', target: 'https://www.baidu.com'}, // 将/app 开头的请求代理到 https://www.baidu.com
    { key:'/fom', target:'https://car.csleasing.com.cn:8000'}, // 将/fom 开头的请求代理到 https://car.csleasing.com.cn:8000
  ]
};
module.exports = conifg;
