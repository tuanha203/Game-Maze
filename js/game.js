class game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.step = -1;
    this.init();
    this.loop();
  }

  init() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;
    document.body.appendChild(this.canvas);

    this.player = new player(this);
    this.target = new target(this);
    this.backgroundWall = new backgroundWall(this);
  }

  loop() {
    this.step++;
    this.update();
    this.draw();
    if (this.player.endGame == true) {
      $('.win').show();
      $('.win h3').text(`You Moved ${this.step} Steps.`);
      $('.back-game').show();
      // remove event when game end because event will be hold forever...
      window.removeEventListener('keydown', this.player.onkeydown);
    }
  }

  update() {
    this.player.update();
  }

  draw() {
    this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.target.draw();
    this.player.draw();
    this.backgroundWall.draw();
  }
}
var GRID = 50;
btnLevel();
btnPlayGame();
btnBack();

function btnPlayGame() {
  $('.play-game').click(() => {
    // remove event when game end because event will be hold forever...
    if (g) {
      window.removeEventListener('keydown', g.player.onkeydown);
    }
    var g = new game();
    $('canvas').show();
  });
}

function btnBack() {
  $('.back-game').click(function () {
    $('.win').hide();
    $(this).hide();
    var g = new game();
  });
}

function btnLevel() {
  $('.level select').click(function () {
    GRID = parseInt($('.level select').val());
  });
}
