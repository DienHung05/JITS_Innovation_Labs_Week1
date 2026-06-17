module.exports = function forbidden(data) {
    const res = this.res;
    const body = { err: 401, message: 'Bạn chưa đăng nhập hoặc không có quyền' };
    return res.status(200).json({ ...body, ...arguments(data || {}) });
};