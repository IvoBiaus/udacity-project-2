"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var helpers_1 = require("../helpers");
var middlewares_1 = require("../middlewares");
var orders_1 = require("../models/orders");
var store = new orders_1.OrderStore();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, orders, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, helpers_1.getUidFromToken)(req)];
            case 1:
                uid = _a.sent();
                return [4 /*yield*/, store.index(uid)];
            case 2:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                res.status(400).send(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, order, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, helpers_1.getUidFromToken)(req)];
            case 1:
                uid = _a.sent();
                return [4 /*yield*/, store.show(parseInt(req.params.id), uid)];
            case 2:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                res.status(400).send(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, order, newOrder, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, helpers_1.getUidFromToken)(req)];
            case 1:
                uid = _a.sent();
                order = {
                    user_id: uid,
                    wands_amount: req.body.wands_amount
                };
                return [4 /*yield*/, store.create(order)];
            case 2:
                newOrder = _a.sent();
                res.json(newOrder);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                res.status(400).send(e_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, order, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, helpers_1.getUidFromToken)(req)];
            case 1:
                uid = _a.sent();
                order = {
                    id: parseInt(req.params.id),
                    user_id: uid,
                    complete: false,
                    wands_amount: req.body.wands_amount
                };
                return [4 /*yield*/, store.update(order)];
            case 2:
                _a.sent();
                res.json(order);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                res.status(400).send(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var complete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, helpers_1.getUidFromToken)(req)];
            case 1:
                uid = _a.sent();
                return [4 /*yield*/, store.complete(parseInt(req.params.id), uid)];
            case 2:
                _a.sent();
                res.sendStatus(200);
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                res.status(400).send(e_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var completedByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, orders, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, helpers_1.getUidFromToken)(req)];
            case 1:
                uid = _a.sent();
                return [4 /*yield*/, store.completedByUser(uid)];
            case 2:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                res.status(400).send(e_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, order, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, helpers_1.getUidFromToken)(req)];
            case 1:
                uid = _a.sent();
                return [4 /*yield*/, store["delete"](parseInt(req.params.id), uid)];
            case 2:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 4];
            case 3:
                e_7 = _a.sent();
                res.status(400).send(e_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var orderRoutes = express_1["default"].Router();
orderRoutes.get('/', middlewares_1.verifyAuthToken, index);
orderRoutes.get('/completed', middlewares_1.verifyAuthToken, completedByUser);
orderRoutes.get('/:id', middlewares_1.verifyAuthToken, show);
orderRoutes.post('/', middlewares_1.verifyAuthToken, create);
orderRoutes.put('/:id', middlewares_1.verifyAuthToken, update);
orderRoutes.put('/:id/complete', middlewares_1.verifyAuthToken, complete);
orderRoutes["delete"]('/:id', middlewares_1.verifyAuthToken, remove);
exports["default"] = orderRoutes;
