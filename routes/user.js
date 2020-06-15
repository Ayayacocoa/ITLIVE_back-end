const express = require('express');
//引入创建的连接池模块
const pool = require('../pool.js');
var router = express.Router();
//註冊的路由
router.get("/sel", (req, res) => {
        var uname = req.query.uname;
        //console.log(uname);
        //2:创建sql语句
        var sql = "select uid from user where uname=?";
        pool.query(sql, [uname], (err, result) => {
            //err 严重错误，程序停止
            //console.log(result);
            if (err) throw err;
            //4:判断执行是否成功
            if (result.length == 0) {
                res.send({ code: 1, msg: "用户名可以使用" });
            } else {
                res.send({ code: -1, msg: "用户名重复" });
            }
            //5:将结果发送脚手架  
        })
    })
    //功能一:用户注册
router.post("/reg", (req, res) => {
    //1:获取参数uname/upwd
    //脚手架传数 
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var uemail = req.body.uemail;
    console.log(1 + ":" + uname + ":" + upwd + ":" + uemail);
    //2:创建sql语句
    var sql = "insert into user(uid,uname,upwd,uemail) values(null,?,md5(?),?)";
    //3:执行sql语句
    pool.query(sql, [uname, upwd, uemail], (err, result) => {
        //err 严重错误，程序停止
        //console.log(result);
        if (err) throw err;
        //4:判断执行是否成功
        if (result.length == 0) {
            res.send({ code: -1, msg: "注册失败" });
        } else {
            var sql = "select uid from user where uname=?";
            pool.query(sql, [uname], (err, result) => {
                //4.1:登录成功后将
                //    登录凭证id保存session对象
                //4.2:获取当前登录用户id
                //result[{id:3}]
                var uid = result[0].uid;
                //4.3:将用户id保存session对象
                req.session.uid = uid;
                //console.log(req.session);
				res.send({ code: 1, data:uid });
            })

            
        }
        //5:将结果发送脚手架  
    })
})

//功能二:用户登录
router.get("/login", (req, res) => {
        //1:获取参数uname/upwd
        //脚手架传数 

        var uname = req.query.uname;
        var upwd = req.query.upwd;
        // console.log(1 + ":" + uname + ":" + upwd);
        //2:创建sql语句
        var sql = "SELECT uid FROM user WHERE uname = ? AND upwd = md5(?)";
        //3:执行sql语句
        pool.query(sql, [uname, upwd], (err, result) => {
            //err 严重错误，程序停止
            if (err) throw err;
            //4:判断执行是否成功
            if (result.length == 0) {
                res.send({ code: -1, msg: "用户名或密码有误" });
            } else {
                //4.1:登录成功后将
                //    登录凭证id保存session对象
                //4.2:获取当前登录用户id
                //result[{id:3}]
                //console.log(result[0])
                var uid = result[0].uid;
                //4.3:将用户id保存session对象
                req.session.uid = uid;
                //console.log(req.session);
                res.send({ code: 1,data:uid });
            }
            //5:将结果发送脚手架  
        })
    })
    //功能三:用户修改信息
router.get("/upLogin", (req, res) => {
    //1:获取参数uname/upwd
    //脚手架传数 
    var uid = req.session.uid;
    var uname = req.query.uname;
    var uemail = req.query.uemail;
    var uhead = req.query.uhead;
    //console.log(uid, uname, uemail, uhead);
    //2:创建sql语句
    var sql = "UPDATE user SET uname=?,uemail=?,uhead=?WHERE uid=?";
    //3:执行sql语句
    pool.query(sql, [uname, uemail, uhead, uid], (err, result) => {
        //err 严重错误，程序停止
        if (err) throw err;
        res.send({ code: 1, msg: "修改成功" });
        //5:将结果发送脚手架  
    })
})
module.exports = router;