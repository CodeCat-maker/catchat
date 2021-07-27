const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const multer = require('multer');
const bodyParser = require('body-parser')
const uploader = multer({dest:'static/imgs'})
const checkUser = require("./moudle/checkUser.js")
app.set("view engine",'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
http.listen(3000,()=>{
    console.log("本地3000端口");
})
checkUser.login(app);
const chatroom = require('./moudle/chatroom.js');
const { fstat } = require('fs');
app.use(express.static(path.join(__dirname,"static")))
app.get("/login",(req,res)=>{
    if(req.signedCookies.name){
       res.location("/") 
       res.end()
    }
    res.render("login",{});
})

app.get('/' , (req , res)=>{
    console.log(req.cookies.name);
    if(!req.cookies.name){
        res.location("/login");
        res.sendStatus(302);
    }
    console.log("success");
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
