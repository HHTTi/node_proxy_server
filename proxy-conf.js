//代理配置
let conifg = {
  //将/kdcos/开头的请求代理到http://172.24.4.220:80这台服务器（类似于vue的代理配置）
  "/kdcos/": {
    target: "http://172.24.4.220:80",
  },
  //将/osm/开头的请求代理到http://120.79.90.199:80这台服务器
  "/osm/": {
    target: "http://120.79.90.199:80",
  },
};
module.exports = conifg;
