module.exports = function ok(data) {
    const res = this.res;
    let body = { err: 200, message: 'Thành công'};
    if (data && typeof data === 'object' && !Array.isArray(data)) {
        body = { ...body, ...data };
    } else if (data !== undefined) {
        body.data = data;
    }
    return res.status(200).json(body);
};