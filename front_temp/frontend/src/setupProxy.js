const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/', {
            target: 'http://tripick.site', // 모든 요청을 프록시 대상 서버 URL로 전달
            changeOrigin: true,
        }),
    );
};
