const { ObjectId } = require('mongodb');

module.exports = {

    // Số dư ví
    getBalance: async function (req, res) {
        try {
            const pocket = await Pocket.findOne({ owner: req.session.userId });
            if (!pocket) return res.error(RespCode.NOT_FOUND);
            return res.ok({ balance: pocket.balance });
        } catch (e) {
            return res.serverError(e);
        }
    },

    // Chuyển tiền qua sđt
    transfer: async function (req, res) {
        try {
            const senderId = req.session.userId;
            const { toPhone,  amount } = req.allParams();

            // Số tiền phải dương
            const money = Number(amount);
            if (!Number.isInteger(money) || money <= 0) {
                return res.error(RespCode.INVALID_AMOUNT);
            }

            // Người nhận tồn tại
            const receiver = await Customer.findOne({ phone: toPhone });
            if (!receiver) return res.error(RespCode.RECEIVER_NOT_FOUND);

            // Không chuyển cho chính mình
            if (receiver.id === senderId) return res.error(RespCode.CANNOT_TRANSFER_TO_SELF);

            // Ví của người gửi và người nhận tồn tại
            const senderPocket = await Pocket.findOne({ owner: senderId });
            const receiverPocket = await Pocket.findOne({ owner: receiver.id });
            if (!senderPocket || !receiverPocket) return res.error(RespCode.POCKET_NOT_FOUND);

            const db = sails.getDatastore().manager;
            const pockets = db.collection('pocket');

            // Số dư đủ + không âm + nguyên tử
            const debit = await pockets.updateOne(
                { _id: new ObjectId(senderPocket.id), balance: { $gte: money } },
                { $inc: { balance: -money } }
            );
            if (debit.modifiedCount === 0) {
                // Không đủ tiền
                return res.error(RespCode.INSUFFICIENT_FUNDS);
            }

            // Cộng đúng số tiền đã trừ
            try {
            await pockets.updateOne(
                { _id: new ObjectId(receiverPocket.id) },
                { $inc: { balance: money } }
            );
            return res.ok({ message: 'Chuyển tiền thành công' });
            } catch (creditErr) {
                // Cộng tiền thất bại, hoàn lại tiền cho người gửi
                await pockets.updateOne(
                    { _id: new ObjectId(senderPocket.id) },
                    { $inc: { balance: money } }
                );
                return res.serverError(creditErr);
            }

            // Đọc số dư mới
            const newSender = await Pocket.findOne({ id: senderPocket.id });
            const newReceiver = await Pocket.findOne({ id: receiverPocket.id });

            // Lưu giao dịch
            await Transaction.create({
                sender: senderId,
                receiver: receiver.id,
                amount: money,
                senderBalanceAfter: newSender.balance,
                receiverBalanceAfter: newReceiver.balance,
            });

            return res.ok({
                to: receiver.phone,
                amount: money,
                balance: newSender.balance, // Số dư sau khi trừ của người gửi
            });
        } catch (e) {
            return res.serverError(e);
        }
    },
    
};