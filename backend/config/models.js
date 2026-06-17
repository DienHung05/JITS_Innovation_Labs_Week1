module.exports.models = {
  datastore: 'default',
  migrate: 'safe',
  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },
    id: { type: 'string', columnName: '_id' },
  },

  dataEncryptionKeys: {
    default: 'aGSomhNwDl+TWTANXTkFV6zxtHfimppC8JtWLfk4lUo='
  },

  cascadeOnDestroy: true

};
