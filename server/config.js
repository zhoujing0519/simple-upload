module.exports = {
  port: 3000,
  cors: {
    allowedOrigin: '*',
    credentials: false,
    headers: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS', 'HEAD'].join(),
    allowedMethods: ['Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Request'].join(),
  },
}