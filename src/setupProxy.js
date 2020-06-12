const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:4000',
            changeOrigin: true,
        })
    );
    app.use(
        '/weather',
        createProxyMiddleware({
            target: 'http://api.map.baidu.com/weather/v1/?district_id=310120&data_type=all&ak=8BfFp8P60mVH1a0yMKzFYTKBvlSHWWR2',
            changeOrigin: true,
        })
    );
}
