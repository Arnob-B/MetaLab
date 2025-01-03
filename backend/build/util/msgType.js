"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgTypes = void 0;
var msgTypes;
(function (msgTypes) {
    msgTypes["toServerPosUpdate"] = "toServerPosUpdate";
    msgTypes["toServerCodeDemand"] = "toServerCodeDemand";
    msgTypes["toServerSaveCode"] = "toServerSaveCode";
    msgTypes["toServerAddToRoom"] = "toServerAddToRoom";
    msgTypes["toServerMonUpdate"] = "toServerMonUpdate";
    msgTypes["toPlayerPosUpdate"] = "toPlayerPosUpdate";
    msgTypes["toPlayerPlayerUpdate"] = "toPlayerPlayerUpdate";
    msgTypes["toPlayerMonUpdate"] = "toPlayerMonUpdate";
    msgTypes["toPlayerCodeResponse"] = "toPlayerCodeResponse";
    msgTypes["toPlayerSaveCodeResponse"] = "toPlayerSaveCodeResponse";
    msgTypes["toPlayerMap"] = "toPlayerMap";
})(msgTypes || (exports.msgTypes = msgTypes = {}));
;
