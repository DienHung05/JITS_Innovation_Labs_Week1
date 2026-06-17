const bcrypt = require('bcryptjs');

module.exports = {
    
    register: async function (req, res) {
        try {
            const { phone, password, name } = req.allParams();
            if (!phone || !password) return res.error(RespCode.BAD_REQUEST);

            const existed = await Customer.findOne({ phone });
            if (existed) return res.error(RespCode.PHONE_EXISTED);

            const hash = await bcrypt.hash(password, 10);

            const customer = await Customer.create({ phone, password: hash, name: name || '' }).fetch();

            const pocket = await Pocket.create({ owner: customer.id, balance: 1000000 }).fetch();

            await Customer.updateOne({ id: customer.id }).set({ pocket: pocket.id });

            req.session.userId = customer.id;

            return res.ok({
                customer: { id: customer.id, phone: customer.phone, name: customer.name },
                balance: pocket.balance,
            });
        } catch (e) {
            return res.serverError(e);
        }
    },

    login: async function (req, res) {
        try {
            const { phone, password } = req.allParams();
            if (!phone || !password) return res.error(RespCode.BAD_REQUEST);
            
            const customer = await Customer.findOne({ phone });
            if (!customer) return res.error(RespCode.WRONG_CREDENTIALS);

            const match = await bcrypt.compare(password, customer.password);
            if (!match) return res.error(RespCode.WRONG_CREDENTIALS);

            req.session.userId = customer.id;

            return res.ok({ customer: { id: customer.id, phone: customer.phone, name: customer.name } });
        } catch (e) {
            return res.serverError(e);
        }
    },

    logout: async function (req, res) {
        delete req.session.userId;
        return res.ok({ message: 'Đã đăng xuất' });
    },

    me: async function (req, res) {
        try {
            const customer = await Customer.findOne({ id: req.session.userId });
            if (!customer) return res.error(RespCode.UNAUTHORIZED);
            return res.ok({ customer: { id: customer.id, phone: customer.phone, name: customer.name } });
        } catch (e) {
            return res.serverError(e);
        }
    },
    
};