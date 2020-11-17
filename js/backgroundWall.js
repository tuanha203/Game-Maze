
// wall = 1, walls = mutiple wall

class backgroundWall {
  constructor(game) {
    this.game = game;
    this.walls = [];
    this.destinations = [];
    this.posTargetCenter = null;

    this.createDestination();
    this.createRandomWalls();
  }

  createDestination() {
    this.destinations.push({ x: this.game.player.x, y: this.game.player.y });
    this.posTargetCenter = { x: this.game.target.x, y: this.game.target.y };

    while (
      this.destinations[this.destinations.length - 1].x !=
        this.posTargetCenter.x ||
      this.destinations[this.destinations.length - 1].y !=
        this.posTargetCenter.y
    ) {
      var lastPoint = this.destinations[this.destinations.length - 1];

      if (Math.round(Math.random() * 1) == 0) {
        lastPoint.direction = "right";
        lastPoint = { x: lastPoint.x + GRID, y: lastPoint.y };
      } else {
        lastPoint.direction = "down";
        lastPoint = { x: lastPoint.x, y: lastPoint.y + GRID };
      }
      if (
        lastPoint.x < 0 ||
        lastPoint.x > GAME_WIDTH - GRID ||
        lastPoint.y < 0 ||
        lastPoint.y > GAME_HEIGHT - GRID
      ) {
        continue;
      }
      this.destinations.push(lastPoint);
    }
  }

  createRandomWalls() {
    // random walls
    for (let i = 0; i < GAME_WIDTH / GRID; i++) {
      for (let j = 0; j < GAME_WIDTH / GRID; j++) {
        var startPos = {
          x: i * GRID,
          y: j * GRID,
        };
        if (i == 0 && j == 0){
            continue;
        }
        if ((i == 0 || j == 0) && Math.round(Math.random()) == 0) {
          continue;
        }
        if (
          (Math.round(Math.random()) == 0 && startPos.y != 0) ||
          startPos.x == 0
        ) {
          var endPos = {
            x: startPos.x + GRID,
            y: startPos.y,
          };
        } else {
          var endPos = {
            x: startPos.x,
            y: startPos.y + GRID,
          };
        }
        this.walls.push({ startPos, endPos });
      }
    }
    // remove wall interfere destination in this.walls
    for (let i = 0; i < this.destinations.length - 1; i++) {
      for (let j = 0; j < this.walls.length; j++) {
        if (this.removeWall(this.destinations[i], this.walls[j])) {
          this.walls.splice(j, 1);
          j--;
        }
      }
    }
  }

  removeWall(point, wall) {
    if (
      point.direction == "right" &&
      point.x + GRID == wall.startPos.x &&
      point.y == wall.startPos.y &&
      point.x + GRID == wall.endPos.x
    ) {
      return true;
    }

    if (
      point.direction == "left" &&
      point.x == wall.startPos.x &&
      point.y == wall.startPos.y &&
      point.x == wall.endPos.x
    ) {
      return true;
    }

    if (
      point.direction == "up" &&
      point.y == wall.startPos.y &&
      point.y == wall.endPos.y &&
      point.x == wall.startPos.x
    ) {
      return true;
    }

    if (
      point.direction == "down" &&
      point.y + GRID == wall.startPos.y &&
      point.x == wall.startPos.x &&
      point.y + GRID == wall.endPos.y
    ) {
      return true;
    }
  }

  draw() {
    this.walls.forEach((Pos) => {
      this.game.ctx.beginPath();
      this.game.ctx.moveTo(Pos.startPos.x, Pos.startPos.y);
      this.game.ctx.lineTo(Pos.endPos.x, Pos.endPos.y);
      this.game.ctx.stroke();
    });
  }
}
