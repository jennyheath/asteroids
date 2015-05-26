(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (numAsteroids) {
    this.DIM_X = 1600;
    this.DIM_Y = 700;
    this.numAsteroids = numAsteroids;
    this.asteroids = this.addAsteroids(numAsteroids);
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    var asteroids = [];
    var that = this;
    for ( var i = 0; i < numAsteroids; i++ ) {
      var randPos = [Math.random() * that.DIM_X, Math.random() * that.DIM_Y];
      var asteroid = new Asteroids.Asteroid(randPos, that);
      asteroids.push(asteroid);
    }
    return asteroids;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];

    var _wrap = function(c, dim) {
      if (c < 0) {
        c += dim;
      } else if ( c > dim ) {
        c = c % dim;
      }
      return c;
    };

    return [ _wrap(x, this.DIM_X), _wrap(y, this.DIM_Y) ];
  };

  Game.prototype.checkCollisions = function () {
    for ( var i = 0; i < this.asteroids.length; i++ ) {
      for ( var j = 0; j < this.asteroids.length; j++ ) {
        if (i === j) { continue; }
        if ( this.asteroids[i].isCollidedWith(this.asteroids[j]) ) {
          // alert("COLLISION");
          this.asteroids[i].collideWith(this.asteroids[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    var idx = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(idx);
  }

})();
