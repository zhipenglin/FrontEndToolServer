var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport=require('passport');

var oauth2=require('./auth/oauth2');

var db=require('./lib/db');
var routes = require('./routes/index');

db();
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/api', routes);

module.exports = app;
