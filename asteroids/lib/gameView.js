(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var gameObj = this;
    setInterval(function () {
      gameObj.game.step();
      gameObj.game.draw(gameObj.ctx);
    }, 200);
  };

})();
