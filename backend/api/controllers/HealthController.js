module.exports = {
    check: async function (req, res) {
        return res.ok({ status: 'up' });
    },
};