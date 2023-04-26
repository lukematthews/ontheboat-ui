const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://marina-api:8080",
      changeOrigin: true,
      headers: {
        Accept: 'application/json'
      }
    })
  );
};
