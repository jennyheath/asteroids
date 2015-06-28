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
      this.game.ship.keydown = true;
      this.game.ship.turn("left");
      // var l = new Date();
      // this.leftPress = l.getTime();
    } else if (key === 39) {
      this.game.ship.keydown = true;
      this.game.ship.turn("right");
      // var r = new Date();
      // this.rightPress = r.getTime();
    } else if (key === 38) {
      this.game.ship.power();
    }
  };

  GameView.prototype.directionHandler = function (event) {
    event.preventDefault();
    var key = event.keyCode;
    if (key === 37) {
      this.game.ship.stopTurn("left");
      // var l = new Date();
      // var leftTime = l.getTime();
      // timeElapsed = leftTime - this.leftPress;
      // this.game.ship.changeDir(timeElapsed/100);
    } else if (key === 39) {
      this.game.ship.stopTurn("right");
      // var r = new Date();
      // var rightTime = r.getTime();
      // timeElapsed = rightTime - this.rightPress;
      // this.game.ship.changeDir(-1*(timeElapsed/100));
    }
  };

  // GameView.prototype.bindKeyHandlers = function () {
  //   var gameView = this;
    // key('left', function () {
    //   gameView.game.ship.changeDir(1);
    // });
    // key('right', function () {
    //   gameView.game.ship.changeDir(-1);
    // });
    // key('up', function () {
    //   gameView.game.ship.power();
    // });
    // key('space', function () {
    //   gameView.game.ship.fireBullet();
    // });
  // };

  GameView.prototype.start = function () {
    var gameObj = this;
    // gameObj.bindKeyHandlers();

    setInterval(function () {
      if (gameObj.game.Lost) {
        // alert("You lost :(");
        location.reload();
      }
      if (gameObj.game.asteroids.length === 0) {
        // alert("You won! :)");
        location.reload();
      }
      gameObj.game.step();
      gameObj.game.draw(gameObj.ctx);
    }, 10);
  };
})();
