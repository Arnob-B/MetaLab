import { WebSocketServer } from "ws"
enum msgStatus { success = "SUCCESS" };

import express from "express"
import WsManager from "./WsManager";
import { log } from "console";
import { json } from "stream/consumers";
import { msgTypes } from "./util/msgType";


const httpServer = express().listen(3000, () => {
  log("running at ", 3000)
});
const wsServer = new WebSocketServer({
  server: httpServer
});

const wsMan = new WsManager();

wsServer.on("connection", (socket) => {
  socket.on("message", async (message: string) => {
    const data = await JSON.parse(message);
    if (data.type === msgTypes.toServerAddToRoom) {
      wsMan.addClient(data.body.playerId, socket);
    }
  })
  socket.send("hello");
});
