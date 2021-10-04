"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var wand_core_1 = __importDefault(require("./handlers/wand_core"));
var wand_1 = __importDefault(require("./handlers/wand"));
var wand_wood_1 = __importDefault(require("./handlers/wand_wood"));
var user_1 = __importDefault(require("./handlers/user"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
app.use(express_1["default"].json());
app.get('/', function (_, res) {
    res.send('Hello World!');
});
(0, orders_1["default"])(app);
(0, user_1["default"])(app);
(0, wand_core_1["default"])(app);
(0, wand_1["default"])(app);
(0, wand_wood_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: " + address);
});
exports["default"] = app;
