const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
http.listen(3000,()=>{
    console.log("本地3000端口");
})
const chatroom = require('./moudle/chatroom.js')
app.use(express.static(path.join(__dirname,"static")))
app.get('/' , (req , res)=>{
    ejs.renderFile("./views/index.ejs",{},(err,data)=>{
        if(err){
            res.end(err);
        }
        res.end(data);
    })
})
chatroom.connection(io);
