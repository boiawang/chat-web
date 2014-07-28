jQuery(function($) {
    var chat_server = 'http://' + location.hostname + ':3000';
    var socket = io.connect(chat_server);

    var userLogin = function(user) {
        var count = parseInt($('.user-list-box .num').text());
        $('.user-list-box .body').append('<li class="list">' + user + '</li>');
        $('.user-list-box .num').text(count + 1);
    };

    socket.on('user-join', function(user) {
        userLogin(user);
    });

    socket.on('my-login', function(user) {
        $('.login-box').empty().text(user + '已登录').data('user', user);
        userLogin(user);
    });

    socket.on('user-say', function(chatInfo) {
        console.log(chatInfo.time);

        $('.msg-show-box').append('<div>' + chatInfo.user + '说：' + chatInfo.content + '</div>');
    });

    $('.btn-login').on('click', function(event) {
        var userName = $('.username').val();

        /*if (userName) {
            $.ajax({
                url: '/room',
                data: {
                    userName: userName
                },
                type: 'POST'
            }).done(function(user) {
                console.log(user)
            });
        }*/

        // 用户登陆
        socket.emit('user-login', userName);

    });

    // 发送消息
    $('.btn-send').on('click', function(event) {
        var content = $('.msg-input-box').text();
        var user = $('.login-box').data('user');

        $('.msg-input-box').empty();

        socket.emit('send-msg', {
            user: user,
            content: content
        });

    });
});