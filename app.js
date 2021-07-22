const express = require('express')();
const ejs = require('ejs');
const http = require('http').Server(express);
const io = require('socket.io')(http);
express.get('/' , (req , res)=>{
    ejs.renderFile("./views/index.ejs",{},(err,data)=>{
        res.end(data);
    })
})
io.on("connection",(so)=>{
    console.log("is connected");
    so.on("disconnect",()=>{
        console.log("disconnect");
    });
    so.on("chatroom",(data)=>{
        io.emit("chatroom",data);
    });
})
http.listen(3000,()=>{
    console.log("本地3000端口");
})