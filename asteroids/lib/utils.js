(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }
  if (window.Asteroids.Util === undefined) {
    window.Asteroids.Util = {};
  }

  Asteroids.Util.inherits = function (ChildClass, SuperClass) {
    function Surrogate() { }
    Surrogate.prototype = SuperClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();
