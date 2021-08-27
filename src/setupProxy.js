const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  // proxy api calls
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:3050/',
      changeOrigin: true,
    }),
  );

  // proxy websocket
  app.use(
    createProxyMiddleware('/socket', {
      target: 'http://localhost:3050/',
      changeOrigin: true,
      ws: true,
    }),
  );
};
