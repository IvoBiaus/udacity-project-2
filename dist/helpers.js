"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getUidFromToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET;
var getUidFromToken = function (req) {
    var _a;
    var token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
    var decoded = jsonwebtoken_1["default"].verify(token, "" + JWT_SECRET);
    return decoded.id;
};
exports.getUidFromToken = getUidFromToken;
