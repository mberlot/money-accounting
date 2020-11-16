const asyncRedis = require("async-redis");
const redisInstance = asyncRedis.createClient({host: 'redis'});

redisInstance.on("error", function(error) {
    console.error(error);
});

module.exports = redisInstance;


