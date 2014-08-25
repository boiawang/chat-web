requirejs.config({
    baseUrl: '/js',
    paths: {
        'jquery': 'vendor/jquery.min',
        'socketIO': 'vendor/socket.io.min'
    },
    shim: {
      'socketIO': {
        exports: 'io'
      }
    }
});

require([ './app/room'], function(RoomView) {
    new RoomView();
});