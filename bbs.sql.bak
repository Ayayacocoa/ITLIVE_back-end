

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";




CREATE TABLE `collect` (
  `pid` int(11) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `collect` (`pid`, `uid`) VALUES
(2, 1),
(3, 1),
(5, 8),
(10, 8),
(4, 8);




CREATE TABLE `ishf` (
  `puid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `muid` int(11) DEFAULT NULL,
  `mid` int(11) DEFAULT NULL,
  `iss` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `ishf` (`puid`, `pid`, `muid`, `mid`, `iss`) VALUES
(7, 4, 1, 0, 1),
(2, 4, 8, 17, 1),
(2, 4, 8, 22, 1),
(2, 4, 8, 23, 1),
(2, 4, 8, 24, 1),
(2, 4, 8, 25, 1),
(2, 4, 8, 26, 1),
(2, 4, 8, 34, 1),
(2, 4, 8, 35, 1),
(2, 4, 8, 36, 1),
(2, 4, 8, 37, 1),
(2, 4, 8, 38, 1),
(2, 4, 8, 39, 1),
(2, 4, 8, 40, 1),
(2, 4, 8, 42, 1);


CREATE TABLE `liaotian` (
  `lid` int(11) NOT NULL,
  `myuid` int(11) DEFAULT NULL,
  `tauid` int(11) DEFAULT NULL,
  `content` varchar(550) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `liaotian` (`lid`, `myuid`, `tauid`, `content`) VALUES
(1, 8, 30, '闪电发货格式件很反感'),
(2, 30, 8, '啥范德萨更广泛的'),
(3, 30, 16, 'sdafssdfsdf'),
(4, 8, 16, 'hgfduhjyj'),
(5, 8, 30, 'asdada'),
(6, 8, 30, 'dfsfs'),
(7, 8, 30, 'fsdsfdfsf'),
(8, 8, 30, 'fsdsfdfsf'),
(9, 8, 30, 'gun'),
(10, 8, 30, 'gun'),
(11, 8, 30, 'gun'),
(12, 8, 30, 'gun'),
(13, 8, 30, '123'),
(14, 8, 30, '123'),
(15, 8, 30, '1'),
(16, 30, 8, 'assa'),
(17, 8, 30, '你好'),
(18, 30, 8, 'as'),
(19, 30, 8, '11'),
(20, 30, 8, '11'),
(21, 30, 8, 'sad'),
(22, 30, 8, 'faddf'),
(23, 30, 8, 'saf'),
(24, 30, 8, 'asfad'),
(25, 30, 8, 'xixi'),
(26, 30, 8, 'sdfsfds'),
(27, 30, 8, 'fsdf'),
(28, 30, 8, 'dfsfg'),
(29, 30, 8, 'asds'),
(30, 30, 8, 'dfsf'),
(31, 30, 8, 'dfsd'),
(32, 30, 8, 'khjkj'),
(33, 30, 8, 'dfsdf'),
(34, 30, 8, 'sdasdf'),
(35, 30, 8, 'sadad'),
(36, 30, 8, 'sdsd1'),
(37, 30, 8, 'sdassd'),
(38, 30, 8, '你好'),
(39, 30, 8, '你好'),
(40, 8, 30, '滚'),
(41, 8, 30, 'dfsf'),
(42, 8, 30, 'nihao'),
(43, 8, 30, 'jghhj'),
(44, 8, 30, 'fdsf'),
(45, 8, 30, 'dsaed'),
(46, 8, 30, 'dasdaasd'),
(47, 8, 30, 'dsada'),
(48, 8, 30, 'sdadas'),
(49, 8, 30, 'ghgfh'),
(50, 8, 30, 'dasd'),
(51, 8, 30, 'dsad'),
(52, 8, 30, 'dfsf'),
(53, 8, 30, 'dfsf'),
(54, 8, 30, 'dgfdgd'),
(55, 8, 30, 'fgdg'),
(56, 8, 30, 'fgfgd'),
(57, 8, 30, 'fgdghs'),
(58, 8, 30, 'gdfg'),
(59, 8, 30, 'nhjfgj'),
(60, 8, 30, 'dfgfgh'),
(61, 8, 30, 'gfdg');



CREATE TABLE `message` (
  `mid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `mcontent` varchar(100) NOT NULL,
  `mtime` char(10) NOT NULL,
  `mzan` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `message` (`mid`, `pid`, `uid`, `mcontent`, `mtime`, `mzan`) VALUES
(1, 1, 1, '法第四条规定翻跟斗风格和', '1965-02-21', 3),
(2, 1, 2, '的非官方施工方更好的风格和', '1997-02-21', -3),
(3, 1, 2, 'sfdfs', '2009-10-21', 0),
(4, 4, 8, '123', '2019-11-22', 1),
(5, 4, 8, '我带你', '2019-11-22', 0),
(6, 5, 8, '', '2019-11-25', 0),
(9, 4, 8, 'gun', '2019-11-26', 0),
(10, 5, 8, 'laad', '2019-11-27', 0),
(11, 45, 45, '4545', '2452', 0),
(12, 4, 8, '一边去', '2019-11-29', 0),
(13, 4, 8, 'kuaidian', '2019-11-29', 0),
(14, 4, 8, 'sadasd', '2019-11-29', 0),
(15, 4, 8, 'dsdfsdfds', '2019-11-29', 0),
(16, 4, 8, 'sdasda', '2019-11-29', 0),
(17, 4, 8, 'sdadasdasdfafd', '2019-11-29', 0),
(22, 4, 8, 'fdfs', '2019-11-29', 0),
(23, 4, 8, 'dfsdfsdf', '2019-11-29', 0),
(24, 4, 8, 'dfsfdsdf', '2019-11-29', 0),
(25, 4, 8, 'dsfsdfsdfsdf', '2019-11-29', 0),
(26, 4, 8, 'sdadsadgasjdfgsfgtiuywastfb iuauyt', '2019-11-29', 0),
(34, 4, 8, 'gdfsgfdsgfsgddfs', '2019-11-29', 0),
(35, 4, 8, 'fgdsgfdg', '2019-11-29', 0),
(36, 4, 8, 'dfsfsdfs', '2019-11-29', 0),
(37, 4, 8, 'sdasdad', '2019-11-29', 0),
(38, 4, 8, 'sdffsdfgrsdgdsf', '2019-11-29', 0),
(39, 4, 8, 'sdffsdfsdgdfs', '2019-11-29', 0),
(40, 4, 8, 'sdfgfgdghsdfhfgdhdfhdfgdfgdgdfj', '2019-11-29', 0),
(41, 14, 8, 'dassdadsafda', '2019-11-29', 1),
(42, 4, 8, 'vgdfgdf', '2019-11-29', 0),
(43, 15, 37, 'dsdfsd', '2019-12-18', 0),
(44, 15, 37, 'gfdgdg', '2019-12-18', 0);


CREATE TABLE `post` (
  `pid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `ptitle` varchar(24) NOT NULL,
  `pcontent` varchar(3000) NOT NULL,
  `ptime` char(10) NOT NULL,
  `pzan` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `post` (`pid`, `sid`, `uid`, `ptitle`, `pcontent`, `ptime`, `pzan`) VALUES
(1, 1, 1, '发射点风格会很尴尬', '啊手动阀打发嘎嘎方法噶沙发大撒旦发个', '1997-11-22', -8),
(2, 2, 2, '地方官大使馆的风格', '的法国三国的鬼地方发电公司风格的', '2002-02-21', 3),
(3, 1, 1, '发射点风格会很尴尬', '啊手动阀打发嘎嘎方法噶沙发大撒旦发个', '1997-11-22', 5),
(4, 2, 2, '地方官大使馆的风格', '的法国三国的鬼地方发电公司风格的', '2002-02-21', 103),
(5, 1, 2, '豆腐干大锅饭', '地方官大使馆但是岁的法国嗲方式', '1998-02-22', 18),
(6, 1, 2, '豆腐干大锅饭', '地方官大使馆但是岁的法国嗲方式', '1998-02-22', 2),
(7, 2, 1, '豆腐干大锅饭', '儿童的发给对方g\'d', '2020-12-21', 3),
(9, 1, 2, 'fsdfs', 'fghdghshdfgh', '2019-11-20', 0),
(10, 1, 1, 'fgdgsdfg', 'dfgdfgdfg', '1902-12-20', 2),
(14, 2, 8, 'fsdfgdrfgfd', 'fgdgdfgfd', '2019-11-29', 0),
(15, 1, 37, 'fgsdgfdg', 'fgdgsdfgsdg', '2019-12-18', 0);



CREATE TABLE `section` (
  `sid` int(11) NOT NULL,
  `sname` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `section` (`sid`, `sname`) VALUES
(1, '前端大全'),
(2, '后端大全'),
(3, '框架大全'),
(4, '组件大全');



CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `uname` varchar(12) DEFAULT NULL,
  `upwd` varchar(32) NOT NULL,
  `uemail` varchar(32) NOT NULL,
  `uhead` varchar(32) DEFAULT '1.jpg',
  `isAdmin` char(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `user` (`uid`, `uname`, `upwd`, `uemail`, `uhead`, `isAdmin`) VALUES
(1, 'nan', 'a123456', '1540@qq.com', '1.jpg', '1'),
(2, 'tom', '123', '139@qq.com', '1.jpg', '0'),
(5, 'il', 'md5(ghfhfgh)', '1540@qq.com', '1.jpg', '0'),
(6, 'ildfg', '51ccbd1e2594c9ebee585043ae171546', '1540@qq.com', '1.jpg', '0'),
(7, 'jianan', '123456', '1540@qq.com', '1.jpg', '0'),
(8, 'jia1', 'e10adc3949ba59abbe56e057f20f883e', '112@qq.com', '1575941059503.jpg', '1'),
(9, '453123', '1312', '1540@qq.com', '1.jpg', '0'),
(10, '4453123', '1312', '1540@qq.com', '1.jpg', '0'),
(11, 'fsdf', 'dfsd', 'dfs@qq.com', '1.jpg', '0'),
(12, 'fsjkdf', 'dfsd', 'dfs@qq.com', '1.jpg', '0'),
(13, 'asdsu', 'ddfd', 'dfgg', '1.jpg', '0'),
(16, '154', '61aa251123372588f96122e431c771ea', '4546@qq.com', '1.jpg', '0'),
(17, 'dai1', 'e10adc3949ba59abbe56e057f20f883e', '156@qq.com', '1.jpg', '0'),
(18, 'nan1', 'e10adc3949ba59abbe56e057f20f883e', '1540@qq.com', '1.jpg', '0'),
(19, 'li1', 'e10adc3949ba59abbe56e057f20f883e', '13@qq.com', '1.jpg', '0'),
(20, 'lijiana', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1.jpg', '0'),
(21, 'lijia', 'e10adc3949ba59abbe56e057f20f883e', '111@qq.com', '1.jpg', '0'),
(22, '1231', '717f3adf178f857f9ad97aaee5ebfa8f', '12@qq.com', '1.jpg', '0'),
(23, '4564', 'e44fea3bec53bcea3b7513ccef5857ac', '4124@qq.com', '1.jpg', '0'),
(24, '454', '35a322a37e6fb34b2aaea6f4ed30aa7f', '1231@qq.com', '1.jpg', '0'),
(25, '145', 'de2d3b18505f768bdf94162f550a2c38', '455@qq.com', '1574859301130.jpg', '0'),
(26, 'sdgahg', '912225405b7bb66a2ede35e283ba7465', '1254@qq.com', '1.jpg', '0'),
(27, '1245', 'ada012db4884546fde5a0efea090d690', '1452154', '1.jpg', '0'),
(30, 'aaa', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1.jpg', '0'),
(34, '123', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1.jpg', '0'),
(35, 'gd', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1.jpg', '0'),
(37, '12345', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1.jpg', '0'),
(38, 'a124', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1.jpg', '0'),
(39, 'jia2', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1.jpg', '0');


CREATE TABLE `zan` (
  `pid` int(11) DEFAULT NULL,
  `uid` int(11) NOT NULL,
  `mid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `zan` (`pid`, `uid`, `mid`) VALUES
(1, 8, NULL),
(NULL, 1, 8),
(NULL, 8, 1),
(NULL, 8, 2),
(NULL, 8, 7),
(5, 8, NULL),
(10, 8, NULL),
(10, 8, NULL),
(4, 8, NULL),
(NULL, 8, 18),
(NULL, 8, 4),
(NULL, 8, 41),
(3, 37, NULL);


ALTER TABLE `liaotian`
  ADD PRIMARY KEY (`lid`);


ALTER TABLE `message`
  ADD PRIMARY KEY (`mid`);


ALTER TABLE `post`
  ADD PRIMARY KEY (`pid`);

ALTER TABLE `section`
  ADD PRIMARY KEY (`sid`);


ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uname` (`uname`);




ALTER TABLE `liaotian`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;


ALTER TABLE `message`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;


ALTER TABLE `post`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;


ALTER TABLE `section`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

