var express = require('express');
var router = express.Router();

var db = require('../models/db');

var fs = require('fs');
var projectData;

db.connect();

fs.readFile('package.json', function(error, data) {
    if (!error) projectData = JSON.parse(data);
});

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/login', function(req, res) {
    res.render('login', {
        projectName: projectData.name
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
        projectName: projectData.name
    });
});

module.exports = router;