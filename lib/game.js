(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (numAsteroids) {
    this.DIM_X = 1200;
    this.DIM_Y = 600;
    this.numAsteroids = numAsteroids;
    this.ship = new Asteroids.Ship(this, [600, 300]);
    this.asteroids = this.addAsteroids(numAsteroids);
    this.bullets = [];
    this.shipAngle = 0;
  };
  Game.prototype.Lost = false;

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship], this.bullets);
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    var asteroids = [];
    var collisions = 0;

    for ( var i = 0; i < numAsteroids; i++ ) {
      var rangesX = [Math.random()*300+700, Math.random()*300];
      var rangesY = [Math.random()*200+400, Math.random()*200];
      var randPos = [rangesX[Math.floor(Math.random()*2)],
                     rangesY[Math.floor(Math.random()*2)]];
      while (this.overlappedAsteroids(asteroids, randPos)) {
        collisions += 1;
        if (collisions > 500) {
          return this.addAsteroids(numAsteroids);
        }
        randPos = [rangesX[Math.floor(Math.random()*2)],
                   rangesY[Math.floor(Math.random()*2)]];
      }
      var asteroid = new Asteroids.Asteroid(randPos, this, false);
      asteroids.push(asteroid);
    }
    return asteroids;
  };

  Game.prototype.overlappedAsteroids = function (asteroids, pos) {
    var collisions = 0;
    asteroids.forEach(function (asteroid) {
      var potentialAsteroid = new Asteroids.Asteroid(pos, this, false);
      if (potentialAsteroid.isCollidedWith(asteroid)) {
        collisions += 1;
      }
    });
    if (collisions > 0) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.draw = function (ctx) {
    this.ctx = ctx;
    ctx.beginPath();
    var img = new Image();
    img.src = "assets/background.png";
    ctx.drawImage(img, 0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach(function (movingObject) {
      movingObject.draw(ctx);
    });
  };

  Game.prototype.lose = function () {
    this.Lost = true;
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
          movingObjects[i].collideWith(movingObjects[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (obj) {
    var idx;
    if (obj instanceof Asteroids.Asteroid) {
      idx = this.asteroids.indexOf(obj);
      this.asteroids.splice(idx, 1);
    } else if (obj instanceof Asteroids.Bullet) {
      idx = this.bullets.indexOf(obj);
      this.bullets.splice(idx, 1);
    }
  };
})();
