module.exports.routes = {
  'POST /health': 'HealthController.check',

  'POST /auth/register': 'AuthController.register',
  'POST /auth/login': 'AuthController.login',
  'POST /auth/logout': 'AuthController.logout',
  'POST /auth/me': 'AuthController.me',

  'POST /wallet/balance': 'WalletController.getBalance',
  'POST /wallet/transfer': 'WalletController.transfer',
};
