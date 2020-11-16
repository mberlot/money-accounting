'use strict';

const Account = require('./account');

const account = new Account();

const getCurrentAccountBalance = async (req, res) => {
    const accountInfo = await account.getAccountInfo();
    return res.status(200).json({ success: true, accountInfo });
};
function isPositive(req, res, next) {
    if (req.body.amount && req.body.amount > 0) {
        next();
    } else {
        let message = 'amount param missing';
        if (req.body.amount && req.body.amount <= 0) {
            message = 'amount param should be positive';
        }
        res.status(400).send({ message });
    }
}

const newTransaction = (req, res) => {
    const amount = req.body['amount'];
    const type = req.body['type'];
    if (!amount || !type) {
        res.status(400).json({ message: `type param missing` });
        return;
    } else {
        try {
            account.newTransaction(amount, type);
            res.status(200).json({ success: true });
        } catch (e) {
            res.sendStatus(500);
        }
    }
};

exports.init = app => {
    app.get('/currentBalance', getCurrentAccountBalance);
    app.post('/newTransaction', isPositive, newTransaction); //applying middleware to be sure amount is possitive
};
//# sourceMappingURL=controller.js.map