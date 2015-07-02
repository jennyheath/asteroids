(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game, exploded) {
    Asteroids.MovingObject.call(this, {pos: pos});
    this.game = game;
    this.exploded = exploded;
    if (this.exploded) {
      this.vel = randomVec(1.5);
      this.radius = 20;
    } else {
      this.vel = randomVec(0.5);
      this.radius = 50;
    }
  };
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  var randomVec = function (length) {
    var dirs = [-1, 1];
    var dir = dirs[Math.floor(Math.random()*2)];
    var x = Math.random()*length*dir;
    var y = Math.sqrt(length*length  - x*x);
    return [x, y];
  };

  Asteroid.prototype.draw = function (ctx) {
    if (this.exploded) {
      this.drawSmall(ctx);
      return;
    }
    ctx.beginPath();
    var img = new Image();
    img.src = "gazorpazorp.png";
    var x = this.pos[0] - this.radius;
    var y = this.pos[1] - this.radius;
    ctx.drawImage(img, x, y, this.radius*2, this.radius*2);
  };

  Asteroid.prototype.drawSmall = function (ctx) {
    ctx.beginPath();
    var img = new Image();
    img.src = "robot.png";
    var x = this.pos[0] - this.radius;
    var y = this.pos[1] - this.radius;
    ctx.drawImage(img, x, y, this.radius*2, this.radius*2);
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      // otherObject.relocate();
      this.game.lose();
    } else if (otherObject instanceof Asteroids.Asteroid) {
      // var v1x = this.vel[0];
      // var v1y = this.vel[1];
      // var v1 = Math.sqrt(Math.pow(v1x, 2) + Math.pow(v1y, 2));
      // var theta1 = Math.acos(v1x/v1);
      //
      // var v2x = otherObject.vel[0];
      // var v2y = otherObject.vel[1];
      // var v2 = Math.sqrt(Math.pow(v2x, 2) + Math.pow(v2y, 2));
      // var theta2 = Math.acos(v2x/v2);
      //
      // var phi = (v1x*v2x + v1y*v2y)/(v1 * v2);
      //
      // var v1xNew = (2*v2*(Math.cos(theta2 - phi))/2)*Math.cos(phi) +
      //               v1*Math.sin(theta1 - phi)*Math.cos(phi + Math.PI/2);
      // var v1yNew = (2*v2*(Math.cos(theta2 - phi))/2)*Math.sin(phi) +
      //               v1*Math.sin(theta1 - phi)*Math.sin(phi + Math.PI/2);
      // this.vel = [v1xNew, v1yNew];
    }
  };
})();
