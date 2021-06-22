
var express = require('express');
var path = require('path');
// 路由中间件
var indexRouter = require('./routes/index');
var vertifyRouter = require('./routes/vertify')
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/search', indexRouter);
app.use('/vertify', vertifyRouter)
app.listen(8080)
module.exports = app;
