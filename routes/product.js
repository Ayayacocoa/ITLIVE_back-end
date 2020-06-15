//功能一，热帖
// 1.引入
const express = require('express');
//引入连接池
const pool = require('../pool.js');
//2.创建路由器对象
const router = express.Router();
//3.添加路由
router.get('/list', function(req, res) {
        //获取当前登录用户uid
        var uid = req.session.uid;
        //console.log(uid);
        //获取页码
        var pno = req.query.pno;
        //设置每页出现几条
        var pcount = 5; //测试5条
        //计算参数
        var star = (pno - 1) * pcount;
        //保存第一次sql语句查询到的帖子内容
        var data;
        var pageCount; //总页
        //查询post表内容
        var sql = "SELECT post.pid,post.sid,post.uid,post.ptitle,post.pcontent,post.ptime,post.pzan,user.uhead,user.uname FROM post LEFT JOIN user ON post.uid=user.uid ORDER BY post.pzan DESC LIMIT ?,?"
        pool.query(sql, [star, pcount], (err, result) => {
            if (err) throw err;
            //查询结果
            // console.log(result);
            data = result;
            // 8:在执行成功回调函数中创建第二条 
            var sql2 = "SELECT count(pid) as c FROM post";
            //9:查询记录总数
            pool.query(sql2, (err, result) => {
                    if (err) throw err;
                    // console.log(result[0]);
                    pageCount = Math.ceil(result[0].c / pcount);
                })
                //3:如果用户没有登录   !!!
            if (uid == undefined) {
                uid = 0;
            }
            var sql3 = "SELECT pid,uid FROM zan where uid=?";
            pool.query(sql3, [uid], (err, result) => {
                if (err) throw err;
                var res1 = result;
                var sql4 = "SELECT pid FROM collect where uid=?";
                pool.query(sql4, [uid], (err, result) => {
                    if (err) throw err;
                    res.send({
                        code: 1, //查询编码
                        msg: "查询成功", //原因
                        rows: data, //当前页内容
                        pageCount: pageCount,
                        pid: res1,
                        cpid: result
                    });
                })
            })

        })
    })
    //功能2  点赞
router.put('/dzan', function(req, res) {
        var pid = req.body.pid; //该帖子pid
        var is = req.body.is; //是否点过赞
        var uid = req.session.uid; //获取当前用户的uid
        //console.log(uid);
        if (uid == undefined) {
            res.send({
                code: 0, //查询编码
                msg: "请登录", //原因
            });
            return;
        }
        if (is == 1) { //如果等于1，点过赞
            var sql = "UPDATE post SET pzan=pzan-1 WHERE pid=?";
            var sql2 = "DELETE FROM zan WHERE pid=?&&uid=?";
        } else { //否则没点
            var sql = "UPDATE post SET pzan=pzan+1 WHERE pid=?";
            var sql2 = "INSERT INTO zan VALUES(?,?,null);";
        }
        pool.query(sql, [pid], (err, result) => {
            if (err) throw err;
            pool.query(sql2, [pid, uid], (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    var sql3 = "SELECT pzan FROM post WHERE pid=?";
                    pool.query(sql3, [pid], (err, result) => {
                        if (err) throw err;
                        var gzan = result;
                        res.send({
                            code: 1, //查询编码
                            msg: "成功", //原因
                            gzan: gzan,
                        });
                    })

                }
            })
        })
    })
    //测试http://127.0.0.1:3000/product/dzan?pid=1&is=1;
    //http://127.0.0.1:3000/user/login?uname=jia&upwd=123456;
    //3.收藏功能
router.put('/scan', function(req, res) {
        var pid = req.body.pid; //该帖子pid
        var is = req.body.is; //是否点收藏过
        var uid = req.session.uid; //获取当前用户的uid
        //console.log(uid);
        if (uid == undefined) {
            res.send({
                code: 0, //查询编码
                msg: "请登录", //原因
            });
            return;
        }
        if (is == 1) { //如果等于1，收藏过
            var sql = "DELETE FROM collect WHERE pid=?&&uid=?";
        } else { //否则没收藏过
            var sql = "INSERT INTO collect VALUES(?,?);";
        }
        pool.query(sql, [pid, uid], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.send({
                    code: 1, //查询编码
                    msg: "成功" //原因
                });
            }
        })
    })
    //4.论坛列表
router.get('/sect', function(req, res) {
        var sql = "SELECT sid,sname FROM section";
        pool.query(sql, (err, result) => {
            if (err) throw err;
            //console.log(result);
            if (result.length > 0) {
                res.send({
                    code: 1, //查询编码
                    msg: "成功", //原因
                    result: result
                });
            }
        })
    })
    //重写论坛列表后台
router.get('/list1', function(req, res) {
    //获取当前登录用户uid
    var uid = req.session.uid;
    //console.log(uid);
    //获取页码
    var sid = req.query.sid;
    var pno = req.query.pno;
    //设置每页出现几条
    var pcount = 5; //测试5条
    //计算参数
    var star = (pno - 1) * pcount;
    //保存第一次sql语句查询到的帖子内容
    var data;
    var pageCount; //总页
    //查询post表内容
    var sql = "SELECT post.pid,post.sid,post.uid,post.ptitle,post.pcontent,post.ptime,post.pzan,user.uhead,user.uname FROM post LEFT JOIN user ON post.uid=user.uid WHERE post.sid=? ORDER BY post.pid DESC LIMIT ?,?"
    pool.query(sql, [sid, star, pcount], (err, result) => {
        if (err) throw err;
        //查询结果
        // console.log(result);
        data = result;
        // 8:在执行成功回调函数中创建第二条 
        var sql2 = "SELECT count(pid) as c FROM post";
        //9:查询记录总数
        pool.query(sql2, (err, result) => {
                if (err) throw err;
                // console.log(result[0]);
                pageCount = Math.ceil(result[0].c / pcount);
            })
            //3:如果用户没有登录   !!!
        if (uid == undefined) {
            uid = 0;
        }
        var sql3 = "SELECT pid,uid FROM zan where uid=?";
        pool.query(sql3, [uid], (err, result) => {
            if (err) throw err;
            var res1 = result;
            var sql4 = "SELECT pid FROM collect where uid=?";
            pool.query(sql4, [uid], (err, result) => {
                if (err) throw err;
                res.send({
                    code: 1, //查询编码
                    msg: "查询成功", //原因
                    rows: data, //当前页内容
                    pageCount: pageCount,
                    pid: res1,
                    cpid: result
                });
            })
        })

    })
})
router.post("/postings", function(req, res) {
    //获取当前登录用户uid
    var uid = req.session.uid;
    if (uid == undefined) {
        res.send({
            code: 0, //查询编码
            msg: "请登录", //原因
        });
    }
    //获取版块id
    var sid = req.body.sid;
    //获取标题
    var ptitle = req.body.ptitle;
    //获取内容
    var pcontent = req.body.pcontent;
    //获取时间
    var b = new Date();
    var ptime = b.getFullYear().toString() + "-" + (b.getMonth() + 1).toString() + "-" + b.getDate().toString();
    //console.log(ptime);
    //zan默认0
    //创建sql语句
    var sql = "INSERT INTO post VALUES(null,?,?,?,?,?,DEFAULT)";
    pool.query(sql, [sid, uid, ptitle, pcontent, ptime], (err, result) => {
        if (err) throw err;
        //console.log(result);
        if (result.affectedRows > 0) {
            res.send({
                code: 1, //查询编码
                msg: "发布成功" //原因
            });
        }
    })
})
		 //4.论坛列表
router.get('/rwxx', function(req, res) {
	var uid=req.query.uid;
        var sql = "select user.uid,user.uname,user.uemail,user.uhead,post.ptitle,post.pid from user left join post on user.uid=post.uid where user.uid=?";
        pool.query(sql,[uid],(err, result) => {
            if (err) throw err;
            //console.log(result);
            if (result.length > 0) {
                res.send({
                    code: 1, //查询编码
                    result: result
                });
            }
        })
    })
//router.post("/fa", function(req, res) {
        //console.log(JSON.parse(req));
        //console.log(JSON.stringify(req));

    //})
    //导出路由器
module.exports = router;