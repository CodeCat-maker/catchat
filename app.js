const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const multer = require('multer');

const uploader = multer({dest:'static/imgs'})
app.set("view engine",'ejs');

app.use(cookieParser());

http.listen(3000,()=>{
    console.log("本地3000端口");
})

const chatroom = require('./moudle/chatroom.js');
const { fstat } = require('fs');
app.use(express.static(path.join(__dirname,"static")))
app.get('/' , (req , res)=>{
    res.render("index",{});
})
app.post('/upload',uploader.single("photoImg"),(req,res)=>{
    let file = req.file;
    console.log(file);
    let extname = path.extname(file.originalname);
    let filename = file.path + extname;
    fs.rename(file.path,filename,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("upload success");
    });
    chatroom.uploadImg(io,file.filename+extname);
    res.send("发送成功");
})
//配置错误应用中间件
app.use((req,res)=>{
    res.status(404).render('404',{});
})

chatroom.connection(io);
