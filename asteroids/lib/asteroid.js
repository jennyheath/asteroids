(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game, exploded) {
    Asteroids.MovingObject.call(this, {pos: pos});
    // this.color = '#6f6d6d';
    this.game = game;
    this.exploded = exploded;
    if (this.exploded) {
      this.vel = randomVec(1);
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
      otherObject.relocate();
      this.game.lose();
    } else if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.vel = [otherObject.vel[0] * -1, otherObject.vel[1] * -1];
      this.vel = [this.vel[0] * -1, this.vel[1] * -1];
    }
  };
})();
