/*
* @description: checking env
*/
var env = process.env.NODE_ENV || 'development';
/*
* @description: fetching env data from json file
*/
var config = require('./config.json');
var envconfig = config[env];
/*
* @description: add env. config values to process.env
*/
Object.keys(envconfig).forEach(key => process.env[key] = envconfig[key]);