var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { Socket } = require('socket.io');

var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);


////////SOCKET//// 
var mangUsers = ["ngocphu"] ; 

io.on("connection",function(socket)
{
  console.log("có người kết nối với id : " + " " + socket.id )

  socket.on("client-send-Username",function(data)
  {
    console.log(data);
    // nếu dữ liệu trùng với mảng thì chứng tỏ tên này có người dùng 
    if(mangUsers.indexOf(data)>=0)
    {
      // gửi cho  riêng user thất bại k
      socket.emit("server-send-fail")
    }
    else
    {

    }
  })
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
