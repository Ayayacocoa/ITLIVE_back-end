// var appio = require("http").createServer();
// //2:创建socket.io对象
// var io = require("socket.io")(appio)
//     //3:监听端口 4000
// appio.listen(4000);
// //4:为io对象绑定事件connection
// 	var users = {};
// var users = {}; // 保存所有用户的键值对集合
// io.on('connection', function (socket) {
//     socket.on('con', function (msg) {
//         var obj = JSON.parse(msg) // 获取连接的用户信息
// 		console.log(obj);
//         users[obj.username] = socket.id; // 将当前用户名和对应的链接id进行保存
//         console.log('有新的链接,最新用户集合为：', users)
//     })
//     // 接收客户端发来的数据
//     socket.on('chat message', function (msg) {
//         var obj = JSON.parse(msg) // 获取连接的用户信息
//         console.log('obj:', obj)
// //        let mes=obj.mes
//         io.to(users[obj.toWho]).emit('receiveMessage', JSON.stringify(obj)); // 通过id将信息转发给指定的对象        
//     })
//     // 如果是断开socket请求，就会触发下面的代码
//     socket.on('disconnect', function () {
//         console.log('user disconnected')
//     })
// });