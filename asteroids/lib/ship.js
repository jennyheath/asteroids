(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game, pos) {
    Asteroids.MovingObject.call(this, {game: game, pos: pos});
    this.radius = 20;
    this.color = "#f60909";
    this.vel = [0,0];
  };
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = [this.game.DIM_X/2, this.game.DIM_Y/2];
    this.vel = [0,0];
  };
})();
