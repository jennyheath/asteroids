(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var gameView = this;
    key('up', function () {
      gameView.game.ship.power([0, -0.005]);
    });
    key('down', function () {
      gameView.game.ship.power([0, 0.005]);
    });
    key('left', function () {
      gameView.game.ship.power([-0.005, 0]);
    });
    key('right', function () {
      gameView.game.ship.power([0.005, 0]);
    });
  };

  GameView.prototype.start = function () {
    var gameObj = this;
    setInterval(function () {
      gameObj.game.step();
      gameObj.game.draw(gameObj.ctx);
      gameObj.bindKeyHandlers();
    }, 20);
  };

})();
