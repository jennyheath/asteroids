(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    Asteroids.MovingObject.call(this, {pos: pos});
    this.color = '#6f6d6d';
    this.radius = 70;
    this.vel = randomVec(20);
    this.game = game;
  };
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  var randomVec = function (length) {
    var range = [-1, 1]
    var multiplier = range[Math.floor(Math.random()*2)]
    var x = Math.random()*length*multiplier;
    var y = Math.sqrt(length*length  - x*x)*multiplier;
    return [x, y];
  };
})();
