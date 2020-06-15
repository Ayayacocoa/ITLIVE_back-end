const express = require('express');
//引入body—parser中间件，中间件只能使用于服务器
const bodyParser = require('body-parser');
//使用qs中间件
//const Qs = require('qs');
//引入连接池
const pool = require('./pool.js');
//引入文件处理模块
var fs = require('fs');
const multer = require('multer');
//  cors				处理跨域
const cors = require("cors");
//  express-session	会话session对象
const session = require("express-session");
//引入路由user
const userRouter = require('./routes/user.js');
//引入路由product
const productRouter = require('./routes/product.js');
//引入路由detail
const detailRouter = require('./routes/detail.js');
//引入路由sc
//const scRouter = require('./routes/sc.js');
var app = express();
//6:配置跨域  允许程序列表
//  http://127.0.0.1:8080
//  http://localhost:8080
app.use(cors({
    origin: [
        "http://127.0.0.1:8080",
        "http://127.0.0.1:5050",
        "http://localhost:8080",
    ],
    credentials: true //每次请求验证
}))
//7:配置session环境
app.use(session({
    secret: "128位安全字符串",
    resave: true, //请求更新数据 
    saveUninitialized: true //保存初始数据
}));
//创建目录  
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
// 传文件
var uploadFolder = './upload/';
// 通过 filename 属性定制
createFolder(uploadFolder);
var storage = multer.diskStorage({
    //目标:目录
    destination: function (req, file, cb) {
        cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        var idx = file.originalname.lastIndexOf('.');
        var suff = file.originalname.substring(idx);
        cb(null, Date.now() + suff);
    }
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })
// 单图上传
app.post('/upload', upload.single('logo'), function (req, res, next) {
    //console.log(req);
    //console.log(res);
    //console.log(next);
    var file = req.file;
    res.send({
        code: '0',
        file: file,
    })

});
// end
app.listen(5050);
//静态资源托管到public目录
app.use(express.static('public'));
app.use(express.static('upload'));
//使用body—parser中间件
app.use(bodyParser.urlencoded({
    //不使用第三方的qs模块
    extended: false
}));
//所有路由的url自动添加/user。/user/reg
app.use('/user', userRouter);
//所有路由的url自动添加/product。/product/...
app.use('/product', productRouter);
//所有路由的url自动添加/detail。/detail/...
app.use('/detail', detailRouter);
//所有路由的url自动添加/detail。/detail/...
//app.use('/sc', scRouter);