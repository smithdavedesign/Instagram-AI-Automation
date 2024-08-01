var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var instagramControllers = require('./controllers/instagramControllers');
var cronjobs = require('./controllers/cronJobs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', instagramControllers);
app.use('/cronjobs', cronjobs);

module.exports = app;