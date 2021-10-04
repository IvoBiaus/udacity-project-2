"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyIsOwner = exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET;
var verifyAuthToken = function (req, res, next) {
    var _a;
    try {
        var token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
        jsonwebtoken_1["default"].verify(token, "" + JWT_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
exports.verifyAuthToken = verifyAuthToken;
var verifyIsOwner = function (req, res, next) {
    var _a;
    var id = parseInt(req.params.id);
    try {
        var token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
        var decoded = jsonwebtoken_1["default"].verify(token, "" + JWT_SECRET);
        if (decoded.id !== id) {
            throw new Error('User is not the owner.');
        }
        next();
    }
    catch (e) {
        res.status(401).send(e);
    }
};
exports.verifyIsOwner = verifyIsOwner;
