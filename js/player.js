class player {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.keyCode = null;
    this.image = null;
    this.isLoadImage = false;
    this.endGame = false;

    this.imageLoad();
    this.eventListener();
  }

  eventListener() {
    window.addEventListener('keydown', this.onkeydown);
  }

  onkeydown = (e) => {
    e.preventDefault();
    this.keyCode = e.keyCode;
    this.game.loop();
  }

  imageLoad() {
    this.image = new Image();
    this.image.src = 'image/player.png';
    this.image.onload = () => {
      this.isLoadImage = true;
    };
  }
  //  39 : 'right',38: 'up',37: 'left',40: 'down'
  update() {
    this.game.backgroundWall.walls.forEach((wall) => {
      this.crashWall(wall);
    });

    if (this.keyCode == 39) {
      if (this.x != GAME_WIDTH - GRID) {
        this.x += GRID;
      }
    }
    if (this.keyCode == 38) {
      if (!this.y == 0) {
        this.y -= GRID;
      }
    }
    if (this.keyCode == 37) {
      if (!this.x == 0) {
        this.x -= GRID;
      }
    }
    if (this.keyCode == 40) {
      if (this.y != GAME_HEIGHT - GRID) {
        this.y += GRID;
      }
    }

    this.keyCode = 0;

    // if player find target
    if (this.x == this.game.target.x && this.y == this.game.target.y) {
      this.endGame = true;
    }
  }

  draw() {
    // if image hasn't load then execute func again
    if (!this.isLoadImage) {
      setTimeout(() => {
        this.draw();
      }, 0);
      return;
    }
    this.game.ctx.drawImage(this.image, this.x, this.y, GRID, GRID);
  }

  crashWall(wall) {
    if (
      this.x + GRID == wall.startPos.x &&
      this.y == wall.startPos.y &&
      this.x + GRID == wall.endPos.x &&
      this.keyCode == 39
    ) {
      this.keyCode = 0;
    }

    if (
      this.x == wall.startPos.x &&
      this.y == wall.startPos.y &&
      this.x == wall.endPos.x &&
      this.keyCode == 37
    ) {
      this.keyCode = 0;
    }

    if (
      this.y == wall.startPos.y &&
      this.y == wall.endPos.y &&
      this.x == wall.startPos.x &&
      this.keyCode == 38
    ) {
      this.keyCode = 0;
    }

    if (
      this.y + GRID == wall.startPos.y &&
      this.x == wall.startPos.x &&
      this.y + GRID == wall.endPos.y &&
      this.keyCode == 40
    ) {
      this.keyCode = 0;
    }
  }
}
