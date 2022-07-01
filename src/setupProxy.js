const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware(['/api', '/socket'], {
      target: 'http://localhost:3050',
      changeOrigin: true,
      ws: true,
      router: {
        '/socket': 'ws://localhost:3050',
      },
    }),
  );
};
