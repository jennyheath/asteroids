(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    // window.addEventListener("keypress", this.spaceBar);
  };

  // GameView.prototype.spaceBar = function (event) {
  //   event.preventDefault();
  // };

  GameView.prototype.bindKeyHandlers = function () {
    var gameView = this;
    key('up', function () {
      gameView.game.ship.power([0, -1]);
    });
    key('down', function () {
      gameView.game.ship.power([0, 1]);
    });
    key('left', function () {
      gameView.game.ship.power([-1, 0]);
    });
    key('right', function () {
      gameView.game.ship.power([1, 0]);
    });
    key('x', function () {
      gameView.game.ship.fireBullet();
    });
  };

  GameView.prototype.start = function () {
    var gameObj = this;
    gameObj.bindKeyHandlers();

    setInterval(function () {
      if (gameObj.game.Lost) {
        alert("You lost :(");
        location.reload();
      }
      gameObj.game.step();
      gameObj.game.draw(gameObj.ctx);
    }, 20);
  };
})();
