var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var con= require("./models/MysqlConfig");
var app = express();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var UtilizadoresRouter = require('./routes/UtilizadoresRouter');
var PersonalTrainerRouter = require('./routes/PersonalTrainerRouter');
var ServicosRouter = require('./routes/ServicosRouter');
var ClienteRouter = require('./routes/ClienteRouter');


app.use(function(req,res,next){
  req.con=con;
  next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/utilizadores',UtilizadoresRouter);
app.use('/api/pts', PersonalTrainerRouter);
app.use('/api/servicos', ServicosRouter);
app.use('/api/clientes', ClienteRouter);

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