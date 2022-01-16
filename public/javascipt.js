$(document).ready(function () {
    var socket = io("http://localhost:3000/");
    socket.on("server-send-fail",function()
    {
        alert("Đã có người sử dụng tên ");
    })
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btnRegister").click(function()
    {
        socket.emit("client-send-Username",$("#username").val())
    })
});
