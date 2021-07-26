let userList = [];
async function deleteUser(userList,id){
    for (var i = 0; i < userList.length; i++) {
        if (userList[i] == id) {
            awaituserList = userList.splice(i, i + 1);
            console.log(i);
            break;
        }
    }
    return userList
}
let app = {
    connection: (io) => {
        io.on("connection", async(so) => {
            await userList.push(so.id);
            data = {
                msg: "join",
                user: so.id,
                userList
            }
            io.emit("chatroom",
                data
            )
            so.on("disconnect", async() => {
                console.log(123);
                userList = await deleteUser(userList,so.id);
                data = {
                    msg: "left",
                    user: so.id,
                    userList
                }
                console.log(data);
                io.emit("chatroom",
                    data
                )
            });
            so.on("chatroom", (Data) => {
                data = {
                    msg: "msg",
                    user: so.id,
                    Data
                }
                console.log(data);
                io.emit("chatroom", data);
            });
        })
    },
    uploadImg: (io, path) => {
        console.log(io);
        console.log(io);
        data = {
            msg: "img",
            path: "imgs/" + path
        }
        console.log(data);
        io.emit("chatroom", data);
    }
}
module.exports = app;