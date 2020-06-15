// 1.引入
const express = require('express');
//引入连接池
const pool = require('../pool.js');
//2.创建路由器对象
const router = express.Router();
//3.添加路由
//帖子
router.get('/list', function(req, res) {
        // console.log(455785);
        var uid = req.session.uid; //获取当前用户的uid
        //console.log(uid);
        if (uid == undefined) {
            res.send({
                code: 0, //查询编码
                msg: "请登录", //原因
            });
            return;
        }
        var pid = req.query.pid; //获取到帖子id
        //创建帖子的sql语句
        var sql1 = "SELECT post.sid,post.uid,post.ptitle,post.pcontent,post.ptime,post.pzan,user.uhead,user.uname FROM post LEFT JOIN user ON post.uid=user.uid WHERE pid=?"
        pool.query(sql1, [pid], (err, result) => {
            if (err) throw err;
            var data = result;
            res.send({
                code: 1, //查询编码
                msg: "查询成功", //原因
                data: data, //帖子内容
            });
        })
    })
    // 消息
router.get('/mess', function(req, res) {
        //获取当前登录用户uid
        var uid = req.session.uid;
        if (uid == undefined) {
            res.send({
                code: 0, //查询编码
                msg: "请登录", //原因
            });
            return;
        }
        //console.log(uid);
        //获取帖子pid
        var pid = req.query.pid
            //获取页码
        var pno = req.query.pno;
        //设置每页出现几条
        var pcount = 10; //测试5条
        //计算参数
        var star = (pno - 1) * pcount;
        //保存第一次sql语句查询到的帖子内容
        var data;
        var pageCount; //总页
        //查询post表内容
        var sql = "SELECT message.mid,message.pid,message.uid,message.mcontent,message.mtime,message.mzan,user.uhead,user.uname FROM message LEFT JOIN user ON message.uid=user.uid WHERE message.pid=? ORDER BY message.mzan DESC LIMIT ?,?"
        pool.query(sql, [pid, star, pcount], (err, result) => {
            if (err) throw err;
            //查询结果
            // console.log(result);
            data = result;
            // 8:在执行成功回调函数中创建第二条 
            var sql2 = "SELECT mid FROM zan WHERE uid=?";
            //9:查询记录总数
            pool.query(sql2, [uid], (err, result) => {
                if (err) throw err;
                //console.log(result);
                res.send({
                    code: 1,
                    data: data,
                    zan: result
                });
            })

        })
    })
    //功能2  点赞
router.get('/dzan', function(req, res) {
        var mid = req.query.mid; //该消息mid
        var is = req.query.is; //是否点过赞
        var uid = req.session.uid; //获取当前用户的uid
        //console.log(uid);
        //console.log(is);
        if (is == 1) { //如果等于1，点过赞
            var sql = "UPDATE message SET mzan=mzan-1 WHERE mid=?";
            var sql2 = "DELETE FROM zan WHERE uid=?&&mid=?";
        } else { //否则没点
            var sql = "UPDATE message SET mzan=mzan+1 WHERE mid=?";
            var sql2 = "INSERT INTO zan VALUES(null,?,?);";
        }
        pool.query(sql, [mid], (err, result) => {
            if (err) throw err;
            pool.query(sql2, [uid, mid], (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    var sql3 = "SELECT mzan FROM message WHERE mid=?";
                    pool.query(sql3, [mid], (err, result) => {
                        if (err) throw err;
                        var gzan = result;
                        //console.log(gzan);
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
    //导出路由器
    //功能3  发消息
router.post('/message', function(req, res) {
        var mcontent = req.body.mcontent; //该消息内容
        var uid = req.session.uid; //获取当前用户的uid
        var pid = req.body.pid; //获取当前帖子的pid
        //获取时间
        var b = new Date();
        var mtime = b.getFullYear().toString() + "-" + (b.getMonth() + 1).toString() + "-" + b.getDate().toString();
        var data;
		var puid;//插到回复表的值
		var mid;//插到回复表的值
		var sql = "INSERT INTO message VALUES(null,?,?,?,?,DEFAULT)";
        pool.query(sql, [pid, uid, mcontent, mtime], (err, result) => {
            if (err) throw err;
			data=result;
			var sql1="SELECT uid FROM post WHERE pid=?"
			var sql2="SELECT mid FROM message WHERE uid=? and pid=?"
			 pool.query(sql1, [pid],(err, result)=>{
			    puid=result[0].uid;
                pool.query(sql2, [uid,pid],(err, result)=>{
			      mid=result[result.length-1].mid;
				  var sql3="INSERT INTO ishf(puid,pid,muid,mid,iss) VALUES (?,?,?,?,1)"
				   pool.query(sql3, [puid,pid,uid,mid],(err, result)=>{
					   res.send({
							code: 1, //查询编码
							msg: "成功", //原因
							res: data
						});
				   })
                  
			    })
			 })
        })
    })
    //功能4  用户中心
router.get('/islogin', function(req, res) {
        var uid = req.session.uid; //获取当前用户的uid
		console.log(uid);
        var sql = "SELECT uid,uname,uemail,uhead FROM user WHERE uid=?";
        pool.query(sql, [uid], (err, result) => {
            if (err) throw err;
            res.send({
                code: 1, //查询编码
                msg: "发布成功", //原因
                data: result
            });

        })
    })
    //功能4  用户退出
router.get('/tu', function(req, res) {
        req.session.uid = undefined; //修改当前用户的uid
        res.send({
            code: 1, //查询编码
            msg: "退出成功" //原因
        });
    })
    //功能5  收藏列表
router.get('/colle', function(req, res) {
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
        var sql = "SELECT post.pid,post.sid,post.uid,post.ptitle,post.pcontent,post.ptime,post.pzan,user.uhead,user.uname FROM collect LEFT JOIN post ON collect.pid=post.pid LEFT JOIN user ON post.uid=user.uid WHERE collect.uid=? ORDER BY post.pzan DESC LIMIT ?,?"
        pool.query(sql, [uid, star, pcount], (err, result) => {
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
    //功能6  我的帖子列表
router.get('/post1', function(req, res) {
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
        var sql = "SELECT post.pid,post.sid,post.uid,post.ptitle,post.pcontent,post.ptime,post.pzan,user.uhead,user.uname FROM post LEFT JOIN user ON post.uid=user.uid WHERE post.uid=? ORDER BY post.pzan DESC LIMIT ?,?"
        pool.query(sql, [uid, star, pcount], (err, result) => {
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
                        cpid: result,
						my:uid
                    });
                })
            })

        })
    })
    //功能6  我的消息列表
router.get('/mess1', function(req, res) {
        //获取当前登录用户uid
        var uid = req.session.uid;
        if (uid == undefined) {
            res.send({
                code: 0, //查询编码
                msg: "请登录", //原因
            });
            return;
        }
        //console.log(uid);
        //获取帖子pid
        var pid = req.query.pid
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
        var sql = "SELECT message.mid,message.pid,message.uid,message.mcontent,message.mtime,message.mzan,user.uhead,user.uname FROM message LEFT JOIN user ON message.uid=user.uid WHERE message.uid=? ORDER BY message.mzan DESC LIMIT ?,?"
        pool.query(sql, [uid, star, pcount], (err, result) => {
            if (err) throw err;
            //查询结果
            // console.log(result);
            data = result;
            // 8:在执行成功回调函数中创建第二条 
            var sql2 = "SELECT mid FROM zan WHERE uid=?";
            //9:查询记录总数
            pool.query(sql2, [uid], (err, result) => {
                if (err) throw err;
                //console.log(result);
                res.send({
                    code: 1,
                    data: data,
                    zan: result
                });
            })

        })
    })
    //功能7  关键字搜索
router.get('/search', function(req, res) {
    //获取当前登录用户uid
    var uid = req.session.uid;
    //console.log(uid);
    //获取关键字
    var key = req.query.val;
    var data;
    //console.log(key);
    //查询post表内容
    var sql = "SELECT post.pid,post.sid,post.uid,post.ptitle,post.pcontent,post.ptime,post.pzan,user.uhead,user.uname FROM post LEFT JOIN user ON post.uid=user.uid WHERE post.ptitle LIKE '%" + key + "%' ORDER BY post.pzan DESC";
    pool.query(sql, (err, result) => {
        //console.log(sql);
        if (err) throw err;
        //查询结果
        //console.log(result);
        data = result;
        //3:如果用户没有登录   !!!
        if (uid == undefined) {
            uid = 0;
        }
        var sql3 = "SELECT pid FROM zan where uid=?";
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
                    pid: res1, //点赞表内容
                    cpid: result //收藏表内容
                });
            })
        })

    })
})
		 //功能8  删帖
router.delete('/del', function(req, res) {
    var pid=req.query.pid;//获得帖子的id;
    //创建sql语句
    var sql = "DELETE FROM post WHERE pid=?";
	var sql1="DELETE FROM message WHERE pid=?";
    var sql2="DELETE FROM zan WHERE pid=?";
    var sql3="DELETE FROM collect WHERE pid=?";
    pool.query(sql,[pid],(err, result) => {
      if(err) throw err;
    })
	pool.query(sql1,[pid],(err, result) => {
      if(err) throw err;
    })
	pool.query(sql2,[pid],(err, result) => {
      if(err) throw err;
    })
	pool.query(sql3,[pid],(err, result) => {
      if(err) throw err;
	  res.send({
	   code:1
	  })
    })
})
 //功能9  是否回复
router.get('/ishf', function(req, res) {
     //获取当前登录用户uid
    var uid = req.session.uid;
    //创建sql语句
    var sql = "SELECT ishf.puid FROM ishf left join user on ishf.puid=user.uid WHERE ishf.iss=1 and ishf.puid=?";
    pool.query(sql,[uid],(err, result) => {
      if(err) throw err;
	  //console.log(result);
	  if(result.length>0){
	    res.send({code:1,con:result.length});
	  }else{
	     res.send({
			code:0
			});
	  }
    })
})
		//功能10  查询回复内容
router.get('/hcont', function(req, res) {
     //获取当前登录用户uid
    var uid = req.session.uid;
	//console.log(uid);
    //创建sql语句
     var sql ="SELECT post.pid,post.ptitle,message.mid,message.mcontent,user.uid,user.uname,user.uhead from ishf left join post on ishf.puid=post.uid and ishf.pid=post.pid left join message on ishf.muid=message.uid and ishf.mid=message.mid left join user on ishf.muid=user.uid WHERE ishf.iss=1 and ishf.puid=?"
	pool.query(sql,[uid],(err, result) => {
      if(err) throw err;
	  //console.log(result);
	  if(result.length>0){
	    res.send({
			code:1,
			data:result
			});
	  }else{
	     res.send({
			code:0
			});
	  }
    })
})
		//功能10  查询回复清除
router.get('/delhf', function(req, res) {
     //获取当前登录用户uid
    var uid = req.session.uid;
	//console.log(uid);
    //创建sql语句
     var sql ="DELETE FROM ishf WHERE puid=?"
	pool.query(sql,[uid],(err, result) => {
      if(err) throw err;
	  //console.log(result);
	  if(result.affectedRows > 0){
	    res.send({
			code:1
			});
	  }
    })
})
//功能10  查询聊天
router.get('/liao', function(req, res) {
     //获取当前登录用户uid
    var uid = req.session.uid;
	//console.log(uid);
    //创建sql语句
     var sql ="(SELECT liaotian.myuid,liaotian.tauid,user.uid,user.uname,user.uhead from liaotian left join user on liaotian.tauid=user.uid WHERE myuid=?) UNION (SELECT liaotian.myuid,liaotian.tauid,user.uid,user.uname,user.uhead from liaotian left join user on liaotian.myuid=user.uid WHERE tauid=?)"
	pool.query(sql,[uid,uid],(err, result) => {
      if(err) throw err;
	  //console.log(result);
	  if(result.length>0){
	    res.send({
			code:1,
			data:result
			});
	  }
    })
})
//功能11  查询聊天内容
router.get('/liaoCen', function(req, res) {
     //获取当前登录用户uid
    var uid = req.session.uid;
	console.log(uid);
	//聊天人的uid
	var tauid = req.query.tauid;
	console.log(tauid);
    //创建sql语句
     var sql ="SELECT liaotian.lid,liaotian.content, liaotian.myuid,liaotian.tauid,user.uid,user.uname,user.uhead from liaotian left join user on liaotian.myuid=user.uid WHERE (myuid=? AND tauid=?) or (myuid=? AND tauid=?) ORDER BY liaotian.lid asc"
	pool.query(sql,[uid,tauid,tauid,uid],(err, result) => {
      if(err) throw err;
	  console.log(result);
	  if(result.length>0){
	    res.send({
			code:1,
			data:result
			});
	  }
    })
})
		//功能11  添加聊天内容
router.get('/setliaoCen', function(req, res) {
     //获取当前登录用户uid
    var uid = req.session.uid;
	console.log(uid);
	//聊天人的uid
	var tauid = req.query.tauid;
	console.log(tauid);
	var content=req.query.content;
	console.log(content);
    //创建sql语句
     var sql ="INSERT INTO liaotian( myuid, tauid, content) VALUES (?,?,?)"
	pool.query(sql,[uid,tauid,content],(err, result) => {
      if(err) throw err;
	  console.log(result);
	    res.send({
			code:1
			});
	  
    })
})
module.exports = router;