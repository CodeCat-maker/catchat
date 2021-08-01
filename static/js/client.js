(function () {
    let data = new Date;
    let hours = data.getHours();
    console.log(hours);
    if (hours >= 19) {
        var html = document.getElementsByTagName("html")[0];
        html.className = "dark";
        html.style.backgroundColor = "black";
    }
}())
const socket = io();
window.onload = function () {
    var btn = document.getElementById("send");
    btn.onclick = function () {
        var text = document.getElementById("m").value;
        socket.emit("message", text);
        return false;
    }
    username = document.cookie.split("=")[1];
    init(username);
    socket.on("login", (data) => {
        userLogin(data);
    })
    socket.on("logout", (data) => {
        useLoginOut(data);
    })

    socket.on("message", async (data) => {
        console.log(data);
        if (data.type == "msg") {
            let ul = document.getElementsByTagName("ul")[0];
            let li = document.createElement("li");
            var d = new Date;
            var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            li.innerHTML = "用户：" + data.user.name + "在 " + time + "说: " + data.data;
            ul.appendChild(li);

        }
        else if (data.type == "img") {
            var ul = document.getElementsByTagName("ul")[0];
            var li = document.createElement("li");
            var d = new Date;
            var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            li.innerText = "用户：" + data.user.name + "在" + time + "发送了一张图片";
            var path = data.path;
            var img = document.createElement("img");
            img.style.width = "50px";
            img.style.height = "50px";
            img.style.border = "1px solid white";
            img.src = path;
            li.appendChild(img);
            ul.appendChild(li);
        }
    })
}
//发送图片
function upload() {
    var formData = new FormData();
    formData.append('photoImg', document.getElementById("photo").files[0]);
    $.ajax({
        type: "POST",
        url: "upload",
        data: formData,
        contentType: false,
        processData: false,
        mimeType: "mulipart/form-data",
        success: (result) => {
            console.log(result);
            alert("发送成功");
            return false;

        },
        error: (data) => {
            console.log("失败");
            return false;
        }
    })
    return false;
}
userid = null
username = null

function getUUid() {
    return new Date().getTime() + "" + Math.floor(Math.random() * 666 + 100)
}
function init(username) {
    username = username;
    var span = document.getElementById("userName");
    span.innerText = username;
    userId = getUUid();
    socket.emit("login", { "name": username, "userId": userId });
}
function userLogin(data) {
    var ul1 = document.getElementsByTagName("ul")[0];
    var li = document.createElement("li");
    var d = new Date;
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    li.innerHTML = "用户：" + data.user.name + " 在" + time + "加入";
    ul1.appendChild(li);
    updataUserList(data);

}
function useLoginOut(data) {
    var ul = document.getElementsByTagName("ul")[0];
    var li = document.createElement("li");
    var d = new Date;
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    li.innerHTML = "用户：" + data.user.name + "在" + time + "离开";
    ul.appendChild(li);
    updataUserList(data);
}
function updataUserList(data) {
    let ul = document.getElementById("userList");
    ul.innerHTML = "<li style='font-weight: bold;''>当前在线用户：" + data.onlineUserList.length + "</li><br>";

    let list = data.onlineUserList;
    for (var i = 0; i < list.length; i++) {
        let li = document.createElement("li");
        li.innerText = list[i].name;
        ul.appendChild(li);
    }
}