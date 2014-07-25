var express = require('express');
var router = express.Router();

var db = require('../models/db');
var chatServer = require('../server');

var fs = require('fs');
var projectData;

fs.readFile('package.json', function(error, data) {
    if (!error) projectData = JSON.parse(data);
});

router.get('/', function(req, res) {
    res.render('index', {
        title: '聊天室'
    });
});

router.get('/register', function(req, res) {
    res.render('register', {
        title: '注册'
    });
});

router.post('/register', function(req, res) {
    console.log(req.body.username, req.body.password, req.body.confirmPsd, req.body.sex);
});

router.get('/login', function(req, res) {
    res.render('login', {
        title: '登陆'
    });
});

router.post('/login', function(req, res) {
    db.add({
        username: req.body.username,
        password: req.body.password
    });

    // res.redirect('/');
});

router.get('/room', function(req, res) {
    res.render('room', {
        title: '房间',
        users: chatServer.users
    });
});

router.post('/room', function(req, res) {
    var userName = req.body.userName;

    if (userName) {
        res.send(req.body.userName);
    } else {
        res.send('用户名不能为空');
    }

});

module.exports = router;