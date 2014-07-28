var express = require('express');
var app = express();
var socketIO = require('socket.io')();
// var db = require('../models/db');

// db.connect();

var userList = [];

socketIO.on('connection', function(_socket) {

    _socket.on('send-msg', function(chatInfo) {
        var time = Date.now();

        chatInfo.time = time;
        if (chatInfo.user && chatInfo.content) {
            _socket.broadcast.emit('user-say', chatInfo);
            return _socket.emit('user-say', chatInfo);
        }
    });

    _socket.on('user-login', function(user) {
        if (user) {
            userList.push(user);
            _socket.broadcast.emit('user-join', user);
            return _socket.emit('my-login', user);
        }
    });
});

exports.userList = userList;

exports.listen = function(server) {
    socketIO.listen(server);
};