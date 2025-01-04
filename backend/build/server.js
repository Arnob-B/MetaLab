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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
var msgStatus;
(function (msgStatus) {
    msgStatus["success"] = "SUCCESS";
})(msgStatus || (msgStatus = {}));
;
const express_1 = __importDefault(require("express"));
const WsManager_1 = __importDefault(require("./WsManager"));
const console_1 = require("console");
const msgType_1 = require("./util/msgType");
const PORT = 3001;
const httpServer = (0, express_1.default)().listen(PORT, () => {
    (0, console_1.log)("running at ", PORT);
});
const wsServer = new ws_1.WebSocketServer({
    server: httpServer
});
const wsMan = new WsManager_1.default();
wsServer.on("connection", (socket) => {
    console.log("got new connection");
    socket.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield JSON.parse(message);
        if (data.type === msgType_1.msgTypes.toServerAddToRoom) {
            wsMan.addClient(data.body.playerId, socket);
        }
    }));
    socket.send("hello");
});
