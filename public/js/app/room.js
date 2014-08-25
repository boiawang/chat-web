define(['socketIO', 'jquery'], function(io) {
    'use strict';

    var RoomView = function() {
        this.init()
    };

    RoomView.prototype = {
        init: function() {
            this.initSocket();

            $('.btn-login').on('click', function(event) {
                var userName = $('.username').val();

                console.log(userName, this)
                // 用户登陆
                this.socket.emit('user-login', userName);

            }.bind(this));

            // 发送消息
            $('.btn-send').on('click', function(event) {
                var content = $('.msg-input-box').text();
                var user = $('.login-box').data('user');

                $('.msg-input-box').empty();

                this.socket.emit('send-msg', {
                    user: user,
                    content: content
                });

            }.bind(this));
        },

        initSocket: function(){
            var chat_server = 'http://' + location.hostname + ':3000';
            this.socket = io.connect(chat_server);
            console.log(this.socket)

            this.socket.on('user-join', function(user) {
                this.userLogin(user);
            }.bind(this));

            this.socket.on('my-login', function(user) {
                $('.login-box').empty().text(user + '已登录').data('user', user);
                this.userLogin(user);
            }.bind(this));

            this.socket.on('user-say', function(chatInfo) {

                $('.msg-show-box').append('<div>' + chatInfo.user + '说：' + chatInfo.content + '</div>');
            }.bind(this));

        },

        userLogin: function(user) {
            var count = parseInt($('.user-list-box .num').text());
            $('.user-list-box .body').append('<li class="list">' + user + '</li>');
            $('.user-list-box .num').text(count + 1);
        }
    };

    return RoomView;
});