"use strict";
exports.__esModule = true;
exports.SocketIoService = void 0;
var socket_io_client_1 = require("socket.io-client");
var SocketIoService = /** @class */ (function () {
    function SocketIoService() {
    }
    SocketIoService.prototype.init = function () {
        this.socket = socket_io_client_1.io('http://localhost:3000');
    };
    return SocketIoService;
}());
exports.SocketIoService = SocketIoService;
