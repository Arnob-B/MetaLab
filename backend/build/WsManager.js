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
const msgType_1 = require("./util/msgType");
var monitorStates;
(function (monitorStates) {
    monitorStates["locked"] = "locked";
    monitorStates["unlocked"] = "unlocked";
})(monitorStates || (monitorStates = {}));
class WsManager {
    constructor() {
        this.players = new Array();
        this.monitors = new Array();
    }
    gotPos(clientId, x, y) {
        this.players.forEach(e => {
            if (e.id != clientId)
                e.socket.send(JSON.stringify({
                    clientId: clientId,
                    x: x,
                    y: y,
                }));
        });
    }
    playerPosCom(body) {
        this.players.forEach(e => {
            if (e.id != body.id)
                e.socket.send(JSON.stringify({
                    type: msgType_1.msgTypes.toPlayerPosUpdate,
                    data: {
                        id: body.id,
                        x: body.x,
                        y: body.y,
                    }
                }));
        });
    }
    codeDemand(body) {
        const ind = this.players.findIndex(e => e.id === body.requestId);
        if (ind != -1) {
            return this.players[ind].code;
        }
        else
            return "did't find code";
    }
    saveCode(body) {
        const ind = this.players.findIndex(e => e.id === body.playerId);
        if (ind != -1) {
            return this.players[ind].code = body.code;
        }
        return body.playerId;
    }
    addClient(clientId, socket) {
        socket.on('message', function (message) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("got msg");
                socket.send("got your msg");
                try {
                    let data = yield JSON.parse(message);
                    if (data.type === msgType_1.msgTypes.toServerPosUpdate) {
                        console.log(data.body);
                        //@ts-ignore
                        this.playerPosCom(data.body);
                    }
                    if (data.type === msgType_1.msgTypes.toServerCodeDemand) {
                        const response = {
                            requestId: data.body.requestId,
                            //@ts-ignore
                            code: this.codeDemand(data.body)
                        };
                        socket.send(JSON.stringify(response));
                    }
                    if (data.type === msgType_1.msgTypes.toServerSaveCode) {
                        //@ts-ignore
                        socket.send(JSON.stringify(this.saveCode(data.body)));
                    }
                }
                catch (err) {
                    console.log(err);
                    console.log("got err");
                }
            });
        }.bind(this));
        this.players.push({
            id: clientId,
            socket: socket,
            code: "",
            x: 0,
            y: 0,
        });
        socket.on("close", () => {
            this.playerIsDeleted({
                id: clientId,
                socket: socket,
                code: "",
                x: 0,
                y: 0,
            });
        });
        this.playerIsAdded({
            id: clientId,
            socket: socket,
            code: "",
            x: 0,
            y: 0,
        });
    }
    playerIsDeleted(newPlayer) {
        this.players.forEach(e => {
            if (e.id != newPlayer.id)
                e.socket.send(JSON.stringify({
                    type: msgType_1.msgTypes.toPlayerPlayerUpdate,
                    data: {
                        type: "playerDeleted",
                        id: newPlayer.id,
                    }
                }));
        });
    }
    playerIsAdded(newPlayer) {
        this.players.forEach(e => {
            if (e.id != newPlayer.id)
                e.socket.send(JSON.stringify({
                    type: msgType_1.msgTypes.toPlayerPlayerUpdate,
                    data: {
                        type: "playerAdded",
                        id: newPlayer.id,
                        x: newPlayer.x,
                        y: newPlayer.y,
                    }
                }));
        });
    }
    playerMap() {
        return this.players.map(e => {
            return {
                id: e.id,
                x: e.x,
                y: e.y
            };
        });
    }
    monitorMap() {
        return this.monitors.map(e => {
            return {
                id: e.id,
                state: e.state,
                lockerId: e.lockerId
            };
        });
    }
    updateMon(id, state, lockerId) {
        var _a, _b, _c, _d;
        if (state === monitorStates.unlocked) {
            //@ts-ignore
            (_a = this.monitors.find(e => e.id === id)) === null || _a === void 0 ? void 0 : _a.lockerId = "";
            //@ts-ignore
            (_b = this.monitors.find(e => e.id === id)) === null || _b === void 0 ? void 0 : _b.state = monitorStates.unlocked;
        }
        else {
            //@ts-ignore
            (_c = this.monitors.find(e => e.id === id)) === null || _c === void 0 ? void 0 : _c.state = monitorStates.locked;
            //@ts-ignore
            (_d = this.monitors.find(e => e.id === id)) === null || _d === void 0 ? void 0 : _d.lockerId = monitorStates.lockerId;
        }
    }
}
exports.default = WsManager;
