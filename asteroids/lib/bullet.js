(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (game, pos, vel) {
    Asteroids.MovingObject.call(this, {game: game, pos: pos, vel: vel});
    this.radius = 5;
    this.color = "#ffff00";
  };
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
