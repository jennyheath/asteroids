(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (game, pos, vel) {
    Asteroids.MovingObject.call(this, {game: game, pos: pos, vel: vel});
    this.radius = 3;
    this.color = "#ffff00";
    this.distanceTraveled = 0;
  };
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.game.remove(obj);
    }
  };
})();
