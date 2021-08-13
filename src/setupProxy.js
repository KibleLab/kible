const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
  // proxy api calls
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3050/',
      changeOrigin: true,
    })
  );

  // proxy websocket
  app.use(
    '/socket',
    createProxyMiddleware({
      target: 'http://localhost:3050/',
      changeOrigin: true,
      ws: true,
    })
  );
};
