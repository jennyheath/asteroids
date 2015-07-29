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
    var robots = new Audio("assets/theyre_robots.mp3");
    robots.play();

    var gameDraw = setInterval(function () {
      if (gameObj.game.Lost) {
        setTimeout(function () {
          var shooting = gameObj.game.ship.fireSound;
          var accelerating = gameObj.game.ship.powerSound;
          if (shooting) {
            shooting.pause();
            accelerating.pause();
          }
          var explodeSound = new Audio("assets/morty_scream.mp3");
          explodeSound.play();

          var img = new Image();
          img.src = "assets/thrust.png";
          var explode = gameObj.game.ship.pos;
          gameObj.ctx.beginPath();
          gameObj.ctx.drawImage(img, explode[0] - 50, explode[1] - 50, 100, 100);
        }, 10);

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
