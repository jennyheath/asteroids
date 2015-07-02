(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    window.addEventListener("keydown", this.keyHandler.bind(this));
    window.addEventListener("keyup", this.directionHandler.bind(this));
  };

  GameView.prototype.spaceBar = function (event) {
    event.preventDefault();
    this.game.ship.fireBullet();
  };

  GameView.prototype.keyHandler = function (event) {
    event.preventDefault();
    var key = event.keyCode;
    if (key === 32) {
      this.game.ship.fireBullet();
    } else if (key === 37) {
      this.game.ship.turn("left");
    } else if (key === 39) {
      this.game.ship.turn("right");
    } else if (key === 38) {
      this.game.ship.power();
    }
  };

  GameView.prototype.directionHandler = function (event) {
    event.preventDefault();
    var key = event.keyCode;
    if (key === 37) {
      this.game.ship.stopTurn("left");
    } else if (key === 39) {
      this.game.ship.stopTurn("right");
    }
  };

  GameView.prototype.start = function () {
    document.getElementById('welcome-page').innerHTML = "";
    var gameObj = this;

    var gameDraw = setInterval(function () {
      if (gameObj.game.Lost) {
        clearInterval(gameDraw);
        var lose = document.getElementById('lose-message');
        lose.style.display = "block";
      }
      if (gameObj.game.asteroids.length === 0) {
        clearInterval(gameDraw);
        var win = document.getElementById('win-message');
        win.style.display = "block";
      }
      gameObj.game.step();
      gameObj.game.draw(gameObj.ctx);
    }, 10);
  };
})();
