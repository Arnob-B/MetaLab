import { WebSocket } from "ws";
import { msgTypes, toPlayerCodeResponse, toServerCodeDemand, toServerPosUpdate, toServerSaveCode } from "./util/msgType";

type player = {
  id: string,
  socket: WebSocket,
  code: string
  x?: 0 | number,
  y?: 0 | number,
}
enum monitorStates {
  locked = "locked",
  unlocked = "unlocked",
}
type monitor = {
  id: string,
  lockerId: string,
  state: monitorStates
  code: string
}
export default class WsManager<WsManagerClass> {
  private players: Array<player>;
  private monitors: Array<monitor>;
  public constructor() {
    this.players = new Array<player>();
    this.monitors = new Array<monitor>();
  }

  gotPos(clientId: string, x: Number, y: Number) {
    this.players.forEach(e => {
      if (e.id != clientId) e.socket.send(JSON.stringify({
        clientId: clientId,
        x: x,
        y: y,
      }));
    })
  }
  playerPosCom(body: toServerPosUpdate) {
    this.players.forEach(e => {
      if (e.id != body.id) e.socket.send(JSON.stringify({
        type: msgTypes.toPlayerPosUpdate,
        data: {
          id: body.id,
          x: body.x,
          y: body.y,
        }
      })
      )
    });
  }
  codeDemand(body: toServerCodeDemand): string {
    const ind: number = this.players.findIndex(e => e.id === body.requestId);
    if (ind != -1) {
      return this.players[ind].code;
    }
    else return "did't find code"
  }
  saveCode(body: toServerSaveCode): string {
    const ind: number = this.players.findIndex(e => e.id === body.playerId);
    if (ind != -1) {
      return this.players[ind].code = body.code;
    }
    return body.playerId
  }
  addClient(clientId: string, socket: WebSocket) {
    socket.on('message', async function(message: string) {
      console.log("got msg");
      socket.send("got your msg");
      try {
        let data = await JSON.parse(message);
        if (data.type === msgTypes.toServerPosUpdate) {
          console.log(data.body);
          //@ts-ignore
          this.playerPosCom(data.body);
        }
        if (data.type === msgTypes.toServerCodeDemand) {
          const response: toPlayerCodeResponse = {
            requestId: data.body.requestId,
            //@ts-ignore
            code: this.codeDemand(data.body)
          }
          socket.send(JSON.stringify(response));
        }
        if (data.type === msgTypes.toServerSaveCode) {
          //@ts-ignore
          socket.send(JSON.stringify(this.saveCode(data.body)));
        }
      }
      catch (err) {
        console.log(err)
        console.log("got err");
      }
    }.bind(this))
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
      })
    })
    this.playerIsAdded({
      id: clientId,
      socket: socket,
      code: "",
      x: 0,
      y: 0,
    })
  }
  playerIsDeleted(newPlayer: player) {
    this.players.forEach(e => {
      if (e.id != newPlayer.id) e.socket.send(
        JSON.stringify(
          {
            type: msgTypes.toPlayerPlayerUpdate,
            data: {
              type: "playerDeleted",
              id: newPlayer.id,
            }
          }
        )
      )
    }
    )
  }
  playerIsAdded(newPlayer: player) {
    this.players.forEach(e => {
      if (e.id != newPlayer.id) e.socket.send(
        JSON.stringify(
          {
            type: msgTypes.toPlayerPlayerUpdate,
            data: {
              type: "playerAdded",
              id: newPlayer.id,
              x: newPlayer.x,
              y: newPlayer.y,
            }
          }
        )
      )
    }
    )
  }
  playerMap() {
    return this.players.map(e => {
      return {
        id: e.id,
        x: e.x,
        y: e.y
      }
    });
  }
  monitorMap() {
    return this.monitors.map(e => {
      return {
        id: e.id,
        state: e.state,
        lockerId: e.lockerId
      }
    });
  }
  updateMon(id: string, state: monitorStates, lockerId?: string) {
    if (state === monitorStates.unlocked) {
      //@ts-ignore
      this.monitors.find(e => e.id === id)?.lockerId = "";
      //@ts-ignore
      this.monitors.find(e => e.id === id)?.state = monitorStates.unlocked;
    }
    else {
      //@ts-ignore
      this.monitors.find(e => e.id === id)?.state = monitorStates.locked;
      //@ts-ignore
      this.monitors.find(e => e.id === id)?.lockerId = monitorStates.lockerId;
    }
  }
}
