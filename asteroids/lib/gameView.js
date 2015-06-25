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
    key('a', function () {
      gameView.game.ship.fireBullet();
    });
  };

  GameView.prototype.start = function () {
    var gameObj = this;
    gameObj.bindKeyHandlers();

    setInterval(function () {
      if (gameObj.game.Lost) {
        var playAgain = displayLose();
        if (playAgain) {
          location.reload();
        } else {
          gameObj.game.Lost = false;
          gameObj.game.asteroids = [];
          return;
        }
      }
      gameObj.game.step();
      gameObj.game.draw(gameObj.ctx);
    }, 20);

    function displayLose () {
      var answer = confirm("You lost :( Play again?");
      return answer;
    }
  };

})();
