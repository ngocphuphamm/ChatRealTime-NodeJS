$(document).ready(function () {
    var socket = io("http://localhost:3000/");
    // bắt sự kiện user đăng ký thất bại 
    socket.on("server-send-fail",function()
    {
        alert("Đã có người sử dụng tên ");
    })

    // bắt sự kiện user đăng ký thành công 
    socket.on("server-send-success",function(data)
    {
        alert("Chúc mừng bạn đăng ký thành công " + data)
        $("#loginForm").hide(2);
        $("#chatForm").show(1);
        $("#nameUser").html(data);
    })

    socket.on("server-send-listuser",function(data)
    {
        $("#boxContent").html("");
        data.forEach(function(el)
        {
            $("#boxContent").append("<div class='user'>" + el + "</div>");
        })
    })
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btnRegister").click(function()
    {
        socket.emit("client-send-Username",$("#username").val())
    })

    $("#btnLogOut").click(function()
    {
        alert("1");
        socket.emit("logout");
        $("#loginForm").show(1);
        $("#chatForm").hide(2);
    })

    $("#btnSendMessages").click(function()
    {
       socket.emit("user-send-mes",$("#txtMessages").val())
    })

    socket.on("server-send-mes",function(data)
    {
        $("#listMessages").append("<div class='ms'>" + data.username+ ":" + data.content +  "</div>")
    })
});
