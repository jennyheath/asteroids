(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game, pos) {
    Asteroids.MovingObject.call(this, {game: game, pos: pos});
    this.radius = 15;
    this.color = "#f60909";
    this.vel = [0,0];
    this.dir = 3.1;
  };
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.changeDir = function (dir) {
    if (dir > 0) {
      if (this.dir + 0.3 > 6.28) {
        this.dir = (this.dir + 0.3) % 6.3;
      } else {
        this.dir += 0.3;
      }
    } else if (dir < 0) {
      if (this.dir - 0.3 < 0) {
        this.dir = (this.dir - 0.3) + 6.3;
      } else {
        this.dir -= 0.3;
      }
    }
    console.log(this.dir);
  };

  Ship.prototype.draw = function (ctx) {
    ctx.beginPath();
    var x = this.pos[0];
    var y = this.pos[1];
    ctx.arc(x, y, this.radius, 0, 2*Math.PI, false);
    var pointerX = x + Math.sin(this.dir)*15;
    var pointerY = y + Math.cos(this.dir)*15;
    ctx.arc(pointerX, pointerY, 3, 0, 2*Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  Ship.prototype.fireBullet = function () {
    var bulletVel = [Math.sin(this.dir)*6, Math.cos(this.dir)*6];
    var bullet = new Asteroids.Bullet(this.game, this.pos, bulletVel);
    this.game.bullets.push(bullet);
  };

  Ship.prototype.power = function () {
    this.vel = [Math.sin(this.dir)*5, Math.cos(this.dir)*5];

    // if (this.vel[0] < 3 || (this.vel[0] >= 3 && impulse[0] < 0)) {
    //   this.vel[0] += impulse[0];
    // } else if (this.vel[0] > -3 || (this.vel[0] <= -3 && impulse[0] > 0)) {
    //   this.vel[0] += impulse[0];
    // }
    // if (this.vel[1] < 3 || (this.vel[1] >= 3 && impulse[1] < 0)) {
    //   this.vel[1] += impulse[1];
    // } else if (this.vel[1] > -3 || (this.vel[1] <= -3 && impulse[1] > 0)) {
    //   this.vel[1] += impulse[1];
    // }
  };

  Ship.prototype.relocate = function () {
    this.pos = [this.game.DIM_X/2, this.game.DIM_Y/2];
    this.vel = [0,0];
  };
})();
