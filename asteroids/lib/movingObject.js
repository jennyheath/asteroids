( function() {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options["pos"];
    this.vel = options["vel"];
    this.radius = options["radius"];
    this.color = options["color"];
    this.game = options["game"];
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.beginPath();
    var x = this.pos[0];
    var y = this.pos[1];
    ctx.arc(x, y, this.radius, 0,2*Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this.pos);
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var sum = this.radius + otherObject.radius;
    var diffInX = this.pos[0] - otherObject.pos[0];
    var diffInY = this.pos[1] - otherObject.pos[1];
    var dist = Math.sqrt(Math.pow(diffInX, 2) + Math.pow(diffInY, 2));
    return (dist <= sum ? true : false);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    // if ( this.isCollidedWith(otherObject) ) {
      this.game.remove(otherObject);
      this.game.remove(this);
    // }
  };
})();
