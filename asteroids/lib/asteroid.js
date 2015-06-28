(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    Asteroids.MovingObject.call(this, {pos: pos});
    this.color = '#6f6d6d';
    this.radius = 50;
    this.vel = randomVec(2);
    this.game = game;
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
    ctx.beginPath();
    // ctx.arc(this.pos[0], this.pos[1], this.radius, 0,2*Math.PI, false);
    // ctx.fillStyle = this.color;
    // ctx.fill();
    var img = new Image();
    img.src = "gazorpazorp.png";
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
