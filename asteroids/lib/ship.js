(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game, pos) {
    Asteroids.MovingObject.call(this, {game: game, pos: pos});
    this.radius = 15;
    this.color = "#f60909";
    this.vel = [0,0];
    this.dir = 0;
  };
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.changeDir = function (dir) {
    if (dir > 0) {
      if (this.dir + 10 >= 360) {
        this.dir = (this.dir + 10) % 360;
      } else {
        this.dir += 10;
      }
    } else if (dir < 0) {
      if (this.dir - 10 < 0) {
        this.dir = (this.dir - 10) + 360;
      } else {
        this.dir -= 10;
      }
    }
  };

  // Ship.prototype.draw = function (ctx) {
  //   ctx.beginPath();
  //   var xPos = this.pos[0];
  //   var yPos = this.pos[1];
  //   ctx.moveTo(xPos, yPos);
  //   ctx.lineTo(xPos+25, yPos+10);
  //   ctx.lineTo(xPos+25, yPos-10);
  //   ctx.lineTo(xPos, yPos);
  //   ctx.strokeStyle = this.color;
  //   ctx.stroke();
  // };

  Ship.prototype.fireBullet = function () {
    var bulletVel;
    if (this.vel[0] === 0 && this.vel[1] === 0) {
      bulletVel = [3, 0];
    } else {
      bulletVel = [this.vel[0]*3, this.vel[1]*3];
    }
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
