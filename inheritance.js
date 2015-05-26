Function.prototype.inherits = function (SuperClass) {
  function Surrogate() { }
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
};

function MovingObject (speed) {
  this.speed = speed;
  var obj = this;
  this.speedUp = function(number) {
    obj.speed += number;
  };
}

function Ship (speed) {
  MovingObject.call(this, speed);
}
Ship.inherits(MovingObject);

function Asteroid (speed) {
  MovingObject.call(this, speed);
}
Asteroid.inherits(MovingObject);
Asteroid.prototype.destroyPlanet = function (planet) {
  console.log("oops");
};

var enterprise = new Ship(400);

console.log(enterprise.speed); // => 400
enterprise.speedUp(100);
console.log(enterprise.speed); // => 500
console.log(enterprise.destroyPlanet()); // => no method error

var tricycle = new MovingObject(3);

console.log(tricycle.destroyPlanet()); // => no method error
