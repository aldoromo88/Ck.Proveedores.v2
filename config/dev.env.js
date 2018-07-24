'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
	API_URL: '"http://201.151.143.183:83/webapi/"',
	//API_URL: '"http://172.22.29.193:64553/"',
	NODE_ENV: '"development"'
});
