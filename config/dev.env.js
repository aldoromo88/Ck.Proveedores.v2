'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
	API_URL: '"http://mxagsv18beta01:94/CK.EDILabelExternal/WebAPI/"',
	//API_URL: '"http://172.22.29.193:64553/"',
	NODE_ENV: '"development"'
});
