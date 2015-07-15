(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    window.addEventListener("keypress", this.defaultPrevent);
  };

  GameView.prototype.defaultPrevent = function (event) {
    event.preventDefault();
  };

  GameView.prototype.keyHandler = function () {
    key('left right up space', function () {
      return false;
    });
  };

  GameView.prototype.checkKeys = function () {
    window.key.isPressed('left') && this.game.ship.turn('left');
    window.key.isPressed('right') && this.game.ship.turn('right');
    window.key.isPressed('up') && this.game.ship.power();
    window.key.isPressed('space') && this.game.ship.fireBullet();
  };

  GameView.prototype.start = function () {
    document.getElementById('welcome-page').innerHTML = "";
    var gameObj = this;
    gameObj.keyHandler();

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
      gameObj.checkKeys();
    }, 10);
  };
})();
