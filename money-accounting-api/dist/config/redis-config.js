"use strict";

const asyncRedis = require("async-redis");
const redisInstance = asyncRedis.createClient();

redisInstance.on("error", function (error) {
    console.error(error);
});

module.exports = redisInstance;
//# sourceMappingURL=redis-config.js.map