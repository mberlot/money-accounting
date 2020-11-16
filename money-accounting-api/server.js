var express = require('express');
const main = require('./api/main');

const app = express();

main.main(app);
