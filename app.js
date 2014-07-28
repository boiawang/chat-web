require('./models/user');
var path = require('path');

var express = require('express');
var app = express();
var favicon = require('static-favicon');
var logger = require('morgan');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var chatServer = require('./server');

var routes = require('./routes/index');

//express基本配置
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(session({
    secret: '1234567890QWERTY'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 86400000
}));

app.use('/', routes);

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});

chatServer.listen(server);