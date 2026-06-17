module.exports.policies = {

  '*': false,

  'HealthController': {
    'check': true,
  },

  'AuthController': {
    'register': true,
    'login': true,
    'logout': 'isLoggedIn',
    'me': 'isLoggedIn',
  },

  'WalletController': {
    getBalance: 'isLoggedIn',
    transfer: 'isLoggedIn',
  },

};
