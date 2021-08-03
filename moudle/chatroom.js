
var onlineUserList = Array();
var app = {
    connection: (io) => {
        io.on("connection", (so) => {
            so.on("login", (user) => {
                so.name = user.name;
                so.userId = user.userId;
                console.log(onlineUserList);
                if (!onlineUserList.hasOwnProperty(user.userid)) {
                    onlineUserList[user.userid] = user.name;
                    onlineUserList.push(user);
                }
                var data = { "onlineUserList": onlineUserList, "user": user };
                io.emit("login", data);
                console.log((user.name + "加入了聊天室"));
            })
            so.on("disconnect", () => {
                delete onlineUserList[so.userId];
                let user = { "name": so.name, "userId": so.userId };
                io.emit("logout", { onlineUserList, user });
                console.log(so.name + "离开了聊天室");
            })
            so.on("message", (data) => {
                msg = {
                    "type": "msg",
                    "room": data.room,
                    "data": data.text,
                    "user": {
                        "name": so.name,
                        "userId": so.userId
                    }
                }
                console.log(msg);
                io.emit("message", msg);
            })
        })
    },
    uploadImg: (io, path, name) => {

        data = {
            type: "img",
            path: "imgs/" + path,
            "user": {
                "name": name
            }
        }
        console.log(data);
        io.emit("message", data);
    }
}
module.exports = app;