
const redisInstance = require('../config/redis-config');

function accountRepository() {

}

accountRepository.prototype.getAccountInfo = async () => {
    const money = await redisInstance.get("currentMoney");
    const transactions = await redisInstance.zrevrange('transactions', 0, -1);
    return {
        currentMoney: (money) ? money : 0,
        transactions
    };
}

accountRepository.prototype.newTransaction = async (amount, type, operation) => {
    const money = await redisInstance.get("currentMoney");
    const newValue = operation(parseInt((money) ? money : 0), parseInt(amount));
    redisInstance.set("currentMoney", newValue);
    const newTransaction = {
        type,
        amount,
        effectiveDate: new Date()
    };
    const count = await redisInstance.zcard('transactions');
    redisInstance.zadd('transactions', count + 1, JSON.stringify(newTransaction));

}

module.exports = accountRepository;
