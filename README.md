## 项目说明

#### 当前版本 v2.0.0

增加多聊天室功能，项目重构。

本项目是在个人学习 Nodejs 开发的聊天室项目，技术使用 njs 模版和 socket.io 两个第三方库以及 MongoDb 数据库

### 项目展示

[演示链接]: http://81.69.252.41:3000/



#### 首页

![](https://i0.hdslb.com/bfs/album/d2bcbd9881216642c705b51e497df01f8746dd65.png)

#### 登陆

![](https://i0.hdslb.com/bfs/album/bf4a0e7d400aeaa990e41fa866ece4d74f439115.png)

#### 注册

![](https://i0.hdslb.com/bfs/album/4a727e555a9a3023b2e35c8ea71bb13502085bf8.png)

#### 聊天室首页

![](https://i0.hdslb.com/bfs/album/2fbd75f3d5f8ccacf61cbeaea37a66a4e232aebc.png)

#### 发送消息和图片

![](https://i0.hdslb.com/bfs/album/f591539df17793ca6adb4aad8e5b8c42d9e73607.png)

### 项目使用

```
> git clone [地址]
> node app.js
```

该项目自动使用Mongo数据库，若无法使用登陆/注册功能，请自行修改本地数据库配置

```
$url = "127.0.0.1"
$name = ""
$password = ""
```

一键安装node依赖

```js
npm i
```

### 功能

| 功能              | 是否已经实现 | 实现时间   |
| ----------------- | ------------ | ---------- |
| 发送/接受消息     | 是           | 2021-07-22 |
| 统计当前在线人数  | 是           | 2021-07-24 |
| 用户离开/加入通知 | 是           | 2021-07-24 |
| 传输图片          | 是           | 2021-07-26 |
| 用户登陆/注册     | 是           | 2021-07-28 |
| 多聊天室          | 是           | 2021-08-03 |
| 传输文件          | 否           | -          |
| 语音通话          | 否           | -          |
| 视频通话          | 否           | -          |

| 应用技术         |
| ---------------- |
| EJS 模版引擎     |
| Socket.io        |
| Express 路由框架 |
| Ajax 访问        |
| paperCss         |
| MongoDb 数据库   |

### 未来设想

开发一款跨平台免费聊天室，支持文件、图片、音频等

支持 linux、windws 和 macOS

综合支持 app、微信小程序和 web 界面

### 未来采用技术

Electron 跨平台桌面程序

[剩下的还没想好]

### 期待你的参与和我一起开发

☺️i am codecat
