
let user = {
    login:(app)=>{
        app.post('/checkLogin' , (req , res)=>{
            let body = req.body;
            console.log(body["username"]);
            if(body["username"] == "codecat"){
                if(body["password"] == "w123456"){
                    res.cookie("name",body["username"])
                    res.send("success");
                }
                else{
                    res.send("error");
                }
            }else{
                res.send("error");
            }
        })
    }
}
module.exports = user;