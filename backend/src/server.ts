import { WebSocketServer } from "ws"
enum msgStatus { success = "SUCCESS" };

import express from "express"
import WsManager from "./WsManager";
import { log } from "console";
import { json } from "stream/consumers";
import { msgTypes } from "./util/msgType";


const PORT = 3001;
const httpServer = express().listen(PORT, () => {
  log("running at ", PORT)
});
const wsServer = new WebSocketServer({
  server: httpServer
});

const wsMan = new WsManager();

wsServer.on("connection", (socket) => {
  console.log("got new connection");
  socket.on("message", async (message: string) => {
    const data = await JSON.parse(message);
    if (data.type === msgTypes.toServerAddToRoom) {
      wsMan.addClient(data.body.playerId, socket);
    }
  })
  socket.send("hello");
});
