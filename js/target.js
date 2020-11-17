class target {
  constructor(game) {
    this.game = game;
    this.x = Math.abs(this.game.player.x - (GAME_WIDTH - GRID));
    this.y = Math.abs(this.game.player.y - (GAME_WIDTH - GRID));
    this.isLoadingImage = false;
    this.image = null;

    this.imageLoad();
  }

  imageLoad() {
    this.image = new Image();
    this.image.src = "image/target.png";
    this.image.onload = () => {
      this.isLoadingImage = true;
    };
  }

  draw() {
    if (!this.isLoadingImage) {
      setTimeout(() => {
        this.draw();
      }, 0);
      return;
    }
    this.game.ctx.drawImage(this.image, this.x, this.y, GRID, GRID);
  }
}
