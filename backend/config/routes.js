module.exports.routes = {
  'POST /health': 'HealthController.check',
  '/': { view: 'pages/homepage' },
};
