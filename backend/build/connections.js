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
Object.defineProperty(exports, "__esModule", { value: true });
class WsManager {
    constructor() {
        this.clients = new Array();
    }
    gotPos(clientId, x, y) {
        this.clients.forEach(e => {
            if (e.id != clientId)
                e.socket.send(JSON.stringify({
                    clientId: clientId,
                    x: x,
                    y: y,
                }));
        });
    }
    addClient(clientId, socket) {
        socket.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            console.log("got msg");
            socket.send("got your msg");
            //@ts-ignore
            const data = yield JSON.parse(message);
            console.log(data);
        }));
        this.clients.push({
            id: clientId,
            socket: socket
        });
    }
}
exports.default = WsManager;
