module.exports = {
    attributes: {
       phone:   { type: 'string', required: true, unique: true },
       password:{ type: 'string', required: true },
       name:    { type: 'string', defaultsTo: '' },

       pocket:  { model: 'pocket' },
    },
};