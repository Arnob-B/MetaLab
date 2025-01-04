export default class Entity {
  constructor() {
    this.allMonitors = [];
    this.allPlayers = [];
  }
  addMonitor(monitor) {
    this.allMonitors.push(monitor);
  }
  addPlayer(player) {
    this.allPlayers.push(player);
  }
  checkHeroAndMonitor(hero, keys) {
    for (let b of this.allMonitors) {
      b.isTouched(hero, keys);
    }
  }
  randomness() {
    for (let a of this.allPlayers) {
      let choice = Math.floor(Math.random() * 10) % 4;
      switch (choice) {
        case 0:
          a.speed.update(32, 0);
          break;
        case 1:
          a.speed.update(-32, 0);
          break;
        case 2:
          a.speed.update(0, 32);
          break;
        case 3:
          a.speed.update(0, -32);
          break;
      }
    }
  }
  render(camera, collisionMap) {
    //this.randomness();
    /*
    for (let a of this.allPlayers) {
      a.move(collisionMap);
      a.draw(camera, collisionMap);
    }
    */
    for (let b of this.allMonitors) {
      b.render(camera);
    }
  }
}
