const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.set("view engine",'ejs');


http.listen(3000,()=>{
    console.log("本地3000端口");
})

const chatroom = require('./moudle/chatroom.js')
app.use(express.static(path.join(__dirname,"static")))
app.get('/' , (req , res)=>{
    res.render("index",{});
})


//配置错误应用中间件
app.use((req,res)=>{
    res.status(404).render('404',{});
})

chatroom.connection(io);
