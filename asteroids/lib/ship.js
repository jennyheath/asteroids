(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game, pos) {
    Asteroids.MovingObject.call(this, {game: game, pos: pos});
    this.radius = 45;
    this.color = "#AC9787"; //"#f60909";
    this.vel = [0,0];
    this.dir = Math.PI/2;
  };
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.turn = function (dir) {
    this.stopped = false;
    var ship = this;
    if (dir === "right") {
      console.log("turning right");
      this.rightTurn = setTimeout(function () {
        ship.changeDir(-1);
      }, 1);
      // setTimeout(function () {
      //   clearInterval(this.rightTurn);
      // }.bind(this), 60);
    } else if (dir === "left") {
      console.log("turning left");
      this.leftTurn = setTimeout(function () {
        ship.changeDir(1);
      }, 1);
      // setTimeout(function () {
      //   clearInterval(this.leftTurn);
      // }.bind(this), 60);
    }
  };

  Ship.prototype.stopTurn = function (dir) {
    this.stopped = true;
    if (dir === "right") {
      console.log("stop right");
      clearInterval(this.rightTurn);
    } else if (dir === "left") {
      console.log("stop left");
      clearInterval(this.leftTurn);
    }
  };

  Ship.prototype.changeDir = function (dir) {
    // if (this.stopped) {
    //   return;
    // }
    var increment = (Math.PI/180)*10;
    if (dir > 0) {
      console.log("increment left");
      if (this.dir + increment > Math.PI*2) {
        this.dir = (this.dir + increment) % Math.PI*2;
      } else {
        this.dir += increment;
      }
    } else if (dir < 0) {
      console.log("increment right");
      if (this.dir - increment < 0) {
        this.dir = (this.dir - increment) + Math.PI*2;
      } else {
        this.dir -= increment;
      }
    }
  };

  Ship.prototype.checkMaxSpeed = function () {
  };

  Ship.prototype.draw = function (ctx) {
    ctx.beginPath();
    var x = this.pos[0];
    var y = this.pos[1];

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

    // this.checkMaxSpeed();
  };

  Ship.prototype.fireBullet = function () {
    var bulletVel = [Math.sin(this.dir)*6, Math.cos(this.dir)*6];
    var bullet = new Asteroids.Bullet(this.game, this.pos, bulletVel);
    this.game.bullets.push(bullet);
  };

  Ship.prototype.power = function () {
    var frictionVec = [-0.5*this.vel[0], -0.5*this.vel[1]];
    var thrustVec = [Math.sin(this.dir)*2, Math.cos(this.dir)*2];
    var forceVec = [frictionVec[0] + thrustVec[0],
                    frictionVec[1] + thrustVec[1]];
    var acceleration = [forceVec[0]/1.3, forceVec[1]/1.3];
    // if (Math.abs(this.vel[0]) < 50) {
      this.vel[0] += acceleration[0];
    // }
    // if (Math.abs(this.vel[1]) < 50) {
      this.vel[1] += acceleration[1];
    // }
  };

  Ship.prototype.relocate = function () {
    this.pos = [this.game.DIM_X/2, this.game.DIM_Y/2];
    this.vel = [0,0];
  };
})();
