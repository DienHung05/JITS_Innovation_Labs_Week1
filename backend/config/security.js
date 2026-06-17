module.exports.security = {
  cors: {
    allRoutes: true,
    allowOrigins: ['http://localhost:5173'],
    allowCredentials: true,
    allowRequestHeaders: ['content-type'],
  },
};
