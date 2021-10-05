"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1["default"])();
var port = 3000;
app.use(express_1["default"].json());
var server = app.listen(3000, function () {
    console.log("Server has started at: http://localhost:" + port);
});
server.timeout = 3000;
app.use('/', routes_1["default"]);
exports["default"] = app;
