var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dbURL = require("../config").db; //数据库地址

exports.connect = function(callback) {
    mongoose.connect(dbURL, callback);
};

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
}

//定义chat对象模型
var UserSchema = new Schema({
    username: String,
    password: String
});

//访问User对象模型
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

exports.add = function(userInfo, callback) {
    var user = new User(userInfo);

    user.save(function(error) {
        console.log(error)
        if (error) {
            util.log("FATAL" + error);
            callback(error);
        } else {
            callback(null);
        }
    });

};

exports.delete = function(name, callback) {
    exports.findTodoByName(name, function(error, doc) {
        if (error)
            callback(error);
        else {
            util.log(util.inspect(doc));
            doc.remove();
            callback(null);
        }
    });
};

exports.allUsers = function(callback) {
    User.find({}, callback);
};

exports.forAll = function(doEach, done) {
    User.find({}, function(error, docs) {
        if (error) {
            util.log('FATAL ' + error);
            done(error, null);
        }
        docs.forEach(function(doc) {
            doEach(null, doc);
        });
        done(null);
    });
};

var findUserByName = exports.findUserByName = function(name, callback) {
    User.findOne({
        _name: name
    }, function(error, doc) {
        if (error) {
            util.log('FATAL ' + error);
            callback(error, null);
        }
        callback(null, doc);
    });
};