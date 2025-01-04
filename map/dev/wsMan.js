import Queue from "../utils/Queue";

export default class WsMan {
  constructor(id) {
    this.ws = new WebSocket("ws://localhost:3001");
    this.playerId = id;
    this.ws.onopen = function(event) {
      this.ws.send(JSON.stringify({
        type: "toServerAddToRoom",
        body: {
          playerId: this.playerId
        }
      }));
    }.bind(this);
    this.jobs = [];
    this.ws.onmessage = async (event) => {
      const res = await JSON.parse(event.data);
      this.jobs.push(res);
    }
  }
  getPosUpdate() {
    const ind = this.arr.findIndex(e => e.type === "toPlayerPosUpdate");
    if (ind != -1) {
      const res = this.arr[ind];
      this.arr.splice(ind, 1);
      return res;
    }
    else return null;
  }
  posUpdate(x, y) {
    this.ws.send(JSON.stringify({
      type: "toServerPosUpdate",
      body: {
        id: this.playerId,
        x: x,
        y: y,
      }
    }))
  }
}
