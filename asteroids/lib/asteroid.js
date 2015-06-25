(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    Asteroids.MovingObject.call(this, {pos: pos});
    this.color = '#6f6d6d';
    this.radius = 40;
    this.vel = randomVec(3);
    this.game = game;
  };
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  var randomVec = function (length) {
    var dirs = [-1, 1];
    var dir = dirs[Math.floor(Math.random()*2)];
    var x = Math.random()*length*dir;
    var y = Math.sqrt(length*length  - x*x);
    return [x, y];
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
      this.game.lose();
    } else if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.vel = [otherObject.vel[0] * -1, otherObject.vel[1] * -1];
      this.vel = [this.vel[0] * -1, this.vel[1] * -1];
    }
  };
})();
