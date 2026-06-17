module.exports = function serverError(err) {
    const req = this.req;
    const res = this.res;
    if (err) req._sails.log.error(err);
    return res.status(200).json({ err: 500, message: 'Lỗi hệ thống' });
};