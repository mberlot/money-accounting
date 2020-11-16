const accountRepository = require('./accountRepository');

const repository = new accountRepository();
const transactionType = {
    DEBIT: (oldValue, newValue) => oldValue - newValue,
    CREDIT: (oldValue, newValue) => oldValue + newValue
};

function Account() {
    this.currentMoney = 0;
    this.transaction = [];
}

Account.prototype.getAccountInfo = async () => {
    const { currentMoney, transactions } = await repository.getAccountInfo();
    this.currentMoney = currentMoney;
    this.transaction = transactions.map(item =>
        JSON.parse(item)
    );
    return this;
}

Account.prototype.newTransaction = (amount, type) => {
    const transactionOperation = transactionType[type]
    if (transactionOperation) {
        repository.newTransaction(amount, type, transactionOperation);
        return 'OK';
    }
    else {
        return 'Incorrect type'
    }
}

module.exports = Account;
