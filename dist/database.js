"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRESS_HOST = _a.POSTGRESS_HOST, POSTGRESS_DB = _a.POSTGRESS_DB, POSTGRESS_USER = _a.POSTGRESS_USER, POSTGRESS_PASSWORD = _a.POSTGRESS_PASSWORD, POSTGRESS_TEST_DB = _a.POSTGRESS_TEST_DB, ENV = _a.ENV;
var client;
console.log('ENV: ', ENV);
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRESS_HOST,
        database: POSTGRESS_TEST_DB,
        user: POSTGRESS_USER,
        password: POSTGRESS_PASSWORD
    });
}
else {
    client = new pg_1.Pool({
        host: POSTGRESS_HOST,
        database: POSTGRESS_DB,
        user: POSTGRESS_USER,
        password: POSTGRESS_PASSWORD
    });
}
exports["default"] = client;
