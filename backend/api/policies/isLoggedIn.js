module.exports = async function (req, res, proceed) {
    if (req.session && req.session.userId) {
        return proceed();
    }
    return res.forbidden();
};