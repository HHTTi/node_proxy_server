var path = require("path");
var httpProxy = require("http-proxy");
var express = require("express");
var app = express();

var rootPath = path.join(__dirname, "../yhec-h5");

var port = 8060; // 指定服务端口
// var filterFields = ["/app","/file","/reported","/fom"]; // 过滤请求路径关键字 type: array
// const target1 = 'http://open-dev.csleasing.com.cn:31304'
const target1 = 'http://10.18.138.228:8080'

var filterFields = [
  { key:'/app', target: target1},
  { key:'/file', target: target1},
  { key:'/reported', target: target1},
  { key:'/fom', target:'https://car.csleasing.com.cn:8000'},
]; // 过滤请求路径关键字 type: array

var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  // 下面的设置用于https
  // ssl: {
  //     key: fs.readFileSync('server_decrypt.key', 'utf8'),
  //     cert: fs.readFileSync('server.crt', 'utf8')
  // },
  // secure: false
});

proxy.on("error", function (err, req, res) {
  // console.log("req", req);
  res.writeHead(500, {
    "content-type": "text/plain",
  });
  console.log(err);
  res.end("Something went wrong. And we are reporting a custom error message.");
});

// 处理静态资源
app.use(express.static(rootPath));

// 只对 filterFields 数组元素有的字段请求，挂载此中间件
filterFields.forEach(function (field) {
  app.use(field.key, function (req, res, next) {

    req.url = field.key + req.url;

    proxy.web(req, res, {
      target: field.target
    })
  })
})

app.listen(port);

console.log("Server runing at : localhost:" + port + "/eCar/register.html")
