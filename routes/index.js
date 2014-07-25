var express = require('express');
var router = express.Router();

var User = require('../models/user').User;
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
    User.find({
        username: req.body.username
    }, function(_user) {
        if (!_user) {
            var user = new User({
                username: req.body.username,
                password: req.body.password,
                sex: req.body.sex
            });

            user.save(function(err, user) {
                if (!err) {
                    res.render('room', {
                        title: '房间',
                        users: chatServer.userList
                    });
                }
            });
        }
    });
});

router.get('/login', function(req, res) {
    res.render('login', {
        title: '登陆'
    });
});

router.post('/login', function(req, res) {
    /*db.add({
        username: req.body.username,
        password: req.body.password
    });*/

    // res.redirect('/');
});

router.get('/room', function(req, res) {
    res.render('room', {
        title: '房间',
        users: chatServer.userList
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