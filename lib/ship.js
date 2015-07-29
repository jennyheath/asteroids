(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game, pos) {
    Asteroids.MovingObject.call(this, {game: game, pos: pos});
    this.radius = 20;
    this.color = "#AC9787"; //"#f60909";
    this.vel = [0,0];
    this.dir = Math.PI/2;
    this.canFire = true;
  };
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.turn = function (dir) {
    this.stopped = false;
    var ship = this;
    if (dir === "right") {
      this.rightTurn = setTimeout(function () {
        ship.changeDir(-1);
      }, 1);
    } else if (dir === "left") {
      this.leftTurn = setTimeout(function () {
        ship.changeDir(1);
      }, 1);
    }
  };

  Ship.prototype.changeDir = function (dir) {
    var increment = (Math.PI/180)*5;
    if (dir > 0) {
      if (this.dir + increment > Math.PI*2) {
        this.dir = (this.dir + increment) % Math.PI*2;
      } else {
        this.dir += increment;
      }
    } else if (dir < 0) {
      if (this.dir - increment < 0) {
        this.dir = (this.dir - increment) + Math.PI*2;
      } else {
        this.dir -= increment;
      }
    }
  };

  Ship.prototype.draw = function (ctx) {
    this.ctx = ctx;
    ctx.beginPath();
    var x = this.pos[0];
    var y = this.pos[1];

    var pointerX = x + Math.sin(this.dir)*30;
    var pointerY = y + Math.cos(this.dir)*30;
    ctx.lineWidth = 1;
    ctx.arc(pointerX, pointerY, 0.5, 0, 2*Math.PI, false);
    ctx.stroke();
    ctx.fillStyle = "#eee";
    ctx.fill();

    ctx.moveTo(x, y);
    ctx.lineWidth = 6;
    ctx.lineTo(pointerX, pointerY);
    ctx.strokeStyle = this.color;
    ctx.stroke();

    this.backX = x - Math.sin(this.dir)*30;
    this.backY = y - Math.cos(this.dir)*30;
    ctx.moveTo(x, y);
    ctx.lineTo(this.backX, this.backY);
    ctx.stroke();

    var img = new Image();
    img.src = "assets/spaceship2.png";
    ctx.drawImage(img, x - 30, y - 15, 60, 30);
  };

  Ship.prototype.fireBullet = function () {
    if (this.canFire) {
      this.fire();
      this.canFire = false;
      setTimeout(function () {
        this.canFire = true;
      }.bind(this), 300);
    }
  };

  Ship.prototype.fire = function () {
    if (this.fireSound) {
      this.fireSound.pause();
    }
    this.fireSound = new Audio("assets/portal_gun.mp3");
    this.fireSound.play();

    var bulletVel = [Math.sin(this.dir)*6, Math.cos(this.dir)*6];
    var bullet = new Asteroids.Bullet(this.game, this.pos, bulletVel);
    this.game.bullets.push(bullet);
  };

  Ship.prototype.power = function () {
    // if (this.powerSound) {
    //   this.powerSound.pause();
    // }
    this.powerSound = new Audio("assets/rick_ship.mp3");
    this.powerSound.play();

    var frictionVec = [-0.5*this.vel[0], -0.5*this.vel[1]];
    var thrustVec = [Math.sin(this.dir)*1.3, Math.cos(this.dir)*1.3];
    var forceVec = [frictionVec[0] + thrustVec[0],
                    frictionVec[1] + thrustVec[1]];
    var acceleration = [forceVec[0], forceVec[1]];
    this.vel[0] += acceleration[0];
    this.vel[1] += acceleration[1];

    var img = new Image();
    img.src = "assets/thrust.png";
    this.ctx.drawImage(img, this.backX - 15, this.backY - 15, 30, 30);
  };

  Ship.prototype.relocate = function () {
    this.pos = [this.game.DIM_X/2, this.game.DIM_Y/2];
    this.vel = [0,0];
  };
})();
