(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game, pos) {
    Asteroids.MovingObject.call(this, {game: game, pos: pos});
    this.radius = 45;
    this.color = "#AC9787"; //"#f60909";
    this.vel = [0,0];
    this.dir = 3.1;
    this.decelerateX = false;
    this.decelerateY = false;
  };
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.changeDir = function (dir) {
    if (dir > 0) {
      if (this.dir + 0.1 > 6.28) {
        this.dir = (this.dir + 0.1) % 6.3;
      } else {
        this.dir += 0.1;
      }
    } else if (dir < 0) {
      if (this.dir - 0.1 < 0) {
        this.dir = (this.dir - 0.1) + 6.3;
      } else {
        this.dir -= 0.1;
      }
    }
    console.log(this.dir);
  };

  Ship.prototype.draw = function (ctx) {
    ctx.beginPath();
    var x = this.pos[0];
    var y = this.pos[1];

    // ctx.arc(x, y, this.radius, 0, 2*Math.PI, false);
    var pointerX = x + Math.sin(this.dir)*50;
    var pointerY = y + Math.cos(this.dir)*50;
    ctx.lineWidth = 1;
    ctx.arc(pointerX, pointerY, 0.5, 0, 2*Math.PI, false);
    ctx.stroke();
    ctx.fillStyle = "#000";
    ctx.fill();

    ctx.moveTo(x, y);
    ctx.lineWidth = 6;
    ctx.lineTo(pointerX, pointerY);
    ctx.strokeStyle = this.color;
    ctx.stroke();

    var img = new Image();
    img.src = "rick.png";
    ctx.drawImage(img, x - 45, y - 25, 90, 50);
  };

  Ship.prototype.fireBullet = function () {
    var bulletVel = [Math.sin(this.dir)*9, Math.cos(this.dir)*9];
    var bullet = new Asteroids.Bullet(this.game, this.pos, bulletVel);
    this.game.bullets.push(bullet);
  };

  Ship.prototype.power = function () {
    this.decelerateX = false;
    this.decelerateY = false;
    this.vel = [Math.sin(this.dir)*3, Math.cos(this.dir)*3];
  };

  Ship.prototype.relocate = function () {
    this.pos = [this.game.DIM_X/2, this.game.DIM_Y/2];
    this.vel = [0,0];
  };
})();
