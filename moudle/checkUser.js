const { MongoClient, LoggerLevel } = require('mongodb'); //引入模块
const url = "mongodb://127.0.0.1:27017" //定义数据库地址
const dbName = "catchat" //定义操作数据库名
const client = new MongoClient(url); //实例化数据库
let G = {
    client: client,
    db:client.db("catchat")
}
let user = {
    login: (app) => {
        app.post('/checkLogin', (req, res) => {
            let body = req.body;
            console.log(body["username"]);
            G.client.connect(async(err)=>{
                if(err){
                    console.log(err);
                    return;
                }
                if(await G.db.collection("user").find({"name":body["username"],"pass":body["password"]}).count() > 0){
                    res.cookie("name",body["username"]);
                    res.send("success");
                    return
                }else{
                    res.send("error");
                    return;
                }
            })
        })
    },
    register:  (app) => {
        app.post('/register', (req, res) => {
            let body = req.body;
            console.log(body);
            G.client.connect((err)=>{
                if(err){
                    console.log(err);
                    return;
                }
                G.db.collection("user").insertOne({"name":body["username"],"pass":body["password"]},(err,data)=>{
                    if(err){
                        console.log(err);
                        res.send("error");
                    }
                    console.log(data);
                    res.send("success");
                })
            })
            G.client.close();
            
        })
    }
}
module.exports = user