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

  Ship.prototype.fireBullet = function () {
    var bulletVel;
    if (this.vel[0] === 0 && this.vel[1] === 0) {
      bulletVel = [3, 3];
    } else {
      bulletVel = [this.vel[0]*3, this.vel[1]*3];
    }
    var bullet = new Asteroids.Bullet(this.game, this.pos, bulletVel);
    this.game.bullets.push(bullet);
  };

  Ship.prototype.power = function (impulse) {
    if (this.vel[0] < 3 || (this.vel[0] >= 3 && impulse[0] < 0)) {
      this.vel[0] += impulse[0];
    } else if (this.vel[0] > -3 || (this.vel[0] <= -3 && impulse[0] > 0)) {
      this.vel[0] += impulse[0];
    }
    if (this.vel[1] < 3 || (this.vel[1] >= 3 && impulse[1] < 0)) {
      this.vel[1] += impulse[1];
    } else if (this.vel[1] > -3 || (this.vel[1] <= -3 && impulse[1] > 0)) {
      this.vel[1] += impulse[1];
    }
  };

  Ship.prototype.relocate = function () {
    this.pos = [this.game.DIM_X/2, this.game.DIM_Y/2];
    this.vel = [0,0];
  };
})();
