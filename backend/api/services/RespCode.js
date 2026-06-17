module.exports = {
    SUCCESS: { err: 200, message: 'Thành công' },

    BAD_REQUEST: { err: 400, message: 'Dữ liệu không hợp lệ' },
    UNAUTHORIZED: { err: 401, message: 'Bạn chưa đăng nhập' },
    SERVER_ERROR: { err: 500, message: 'Lỗi hệ thống' },

    PHONE_EXISTED: { err: 1001, message: 'Số điện thoại đã tồn tại' },
    WRONG_CREDENTIALS: { err: 1002, message: 'Số điện thoại hoặc mật khẩu không đúng' },

    POCKET_NOT_FOUND: { err: 2001, message: 'Không tìm thấy ví' },
    RECEIVER_NOT_FOUND: { err: 2002, message: 'Người nhận không tồn tại' },
    CANNOT_SELF_TRANSFER: { err: 2003, message: 'Không thể chuyển tiền cho chính mình' },
    INVALID_AMOUNT: { err: 2004, message: 'Số tiền không hợp lệ' },
    INSUFFICIENT_FUNDS: { err: 2005, message: 'Số dư không đủ' },
};