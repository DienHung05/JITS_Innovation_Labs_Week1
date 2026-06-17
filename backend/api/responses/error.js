module.exports = function error(code, extra) {
    const res = this.res;
    let body = (code && typeof code == 'object')
        ? { err: code.err, message: code.message }
        : { err: code || 400, message: 'Lỗi' };
        if (extra && typeof extra == 'object') body = { ...body, ...extra };
    return res.status(200).json(body);
};