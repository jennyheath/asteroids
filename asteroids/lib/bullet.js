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
      this.game.remove(obj);
    }
  };

  Bullet.prototype.draw = function (ctx) {
    ctx.beginPath();
    var x = this.pos[0] - this.radius/2;
    var y = this.pos[1] - this.radius/2;
    var img = new Image();
    img.src = "magicseed.png";
    ctx.drawImage(img, x, y, this.radius, this.radius);
  };
})();
