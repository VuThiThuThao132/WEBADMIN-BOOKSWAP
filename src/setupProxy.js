const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/bookswap/api',
        createProxyMiddleware({
            target: 'https://bookswapplatform.site',
            changeOrigin: true,
        })
    );
};
