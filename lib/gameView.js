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
    var gameView = this;
    var k = key.noConflict();

    k('left', function(){
      gameView.game.ship.turn("left");
    });
    k('right', function(){
      gameView.game.ship.turn("right");
    });
    k('up', function(){
      gameView.game.ship.power();
    });
    k('space', function(){
      gameView.game.ship.fireBullet();
    });
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
    }, 10);
  };
})();
