let userList = [];
let app = {
    connection:(io)=>{
        io.on("connection",(so)=>{
            userList.push(so.id);
            data = {
                msg:"join",
                user:so.id,
                userList
            }
            io.emit("chatroom",
                    data
            )
            so.on("disconnect",()=>{
                for(var i = 0 ; i < userList.length; i ++){
                    if(userList[i] == so.id){
                        userList = userList.splice(i,i+1);
                        console.log(i);
                        break;
                    }
                }
                data = {
                    msg:"left",
                    user:so.id,
                    userList
                }
                console.log(data);
                io.emit("chatroom",
                    data
                )
            });
            so.on("chatroom",(Data)=>{
                data = {
                    msg:"msg",
                    user:so.id,
                    Data
                }
                console.log(data);
                io.emit("chatroom",data);
            });
        })
    }
}
module.exports = app;