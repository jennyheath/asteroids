(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (game, pos, vel) {
    Asteroids.MovingObject.call(this, {game: game, pos: pos, vel: vel});
    this.radius = 10;
    this.color = "#00E600";
    this.distanceTraveled = 0;
  };
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      if (obj.exploded) {
        this.game.remove(obj);
        this.game.remove(this);
      } else {
        for (i = 0; i <= 2; i++) {
          var smallAsteroid = new Asteroids.Asteroid(obj.pos, this.game, true);
          this.game.asteroids.push(smallAsteroid);
        }
        this.game.remove(obj);
        this.game.remove(this);
      }
    }
  };

  Bullet.prototype.draw = function (ctx) {
    ctx.beginPath();
    var x = this.pos[0] - this.radius/2;
    var y = this.pos[1] - this.radius/2;
    var img = new Image();
    img.src = "assets/magicseed.png";
    ctx.drawImage(img, x, y, this.radius, this.radius);
  };
})();
