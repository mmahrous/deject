const fnArgs = require('fn-args');
module.exports = config => require('./src/di')(fnArgs, config)