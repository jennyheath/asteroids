(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (numAsteroids) {
    this.DIM_X = 1600;
    this.DIM_Y = 700;
    this.numAsteroids = numAsteroids;
    this.asteroids = this.addAsteroids(numAsteroids);
    this.ship = new Asteroids.Ship(this, [800, 350]);
    this.bullets = [];
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship], this.bullets);
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    var asteroids = [];
    for ( var i = 0; i < numAsteroids; i++ ) {
      var randPos = [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
      var asteroid = new Asteroids.Asteroid(randPos, this);
      asteroids.push(asteroid);
    }
    return asteroids;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach(function (movingObject) {
      movingObject.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (movingObject) {
      movingObject.move();
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
    var movingObjects = this.allObjects();
    for ( var i = 0; i < movingObjects.length; i++ ) {
      for ( var j = 0; j < movingObjects.length; j++ ) {
        if (i === j) { continue; }
        if ( movingObjects[i].isCollidedWith(movingObjects[j]) ) {
          // if (movingObjects[i] instanceof Asteroids.Asteroid) {
            movingObjects[i].collideWith(movingObjects[j]);
          // }
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
