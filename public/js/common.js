//The build will inline common dependencies into this file.

requirejs.config({
    baseUrl: '/js',
    paths: {
        'jquery': 'vender/jquery.min'
    }
});