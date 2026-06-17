module.exports = {
    attributes: {
        sender: { model: 'customer', required: true },
        receiver: { model: 'customer', required: true },
        amount: { type: 'number', required: true },

        senderBalanceAfter: { type: 'number'},
        receiverBalanceAfter: { type: 'number'},
    },
};