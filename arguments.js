var sum = function() {
  var args = Array.prototype.slice.call(arguments);
  var sum = 0;
  args.forEach(function (el) {
    sum += el;
  });
  return sum;
};

Function.prototype.myBind = function (obj) {
  var args = Array.prototype.slice.call(arguments, 1);
  var fn = this;
  return function () {
    var addArgs = Array.prototype.slice.call(arguments);
    var allArgs = args.concat(addArgs);
    fn.apply(obj, allArgs);
  };
};

var curriedSum = function (numArgs) {
  var numbers = [];

  var _curriedSum = function (number) {
    numbers.push(number);
    if ( numbers.length === numArgs ) {
      return numbers.reduce( function(a, b) {
        return a + b;
      });
    } else {
      return _curriedSum;
    }
  };

  return _curriedSum;
};

Function.prototype.curry = function (numArgs) {
  var args = [];
  var fn = this;
  var _curry = function (arg) {
    args.push(arg);
    if ( args.length === numArgs ) {
      return fn.apply(null, args);
    } else {
      return _curry;
    }
  };

  return _curry;
};


var total = sum.curry(3);
var f1 = total(3);
var f2 = f1(4);

console.log( f2(4) );
// console.log(); // => 56

// var myObj = {
//   name: 'David',
//
//   myFunction: function (a, b, c) {
//     console.log(this.name + " favorite sum is " + (a + b + c));
//   }
// };
//
// myObj.myFunction.myBind(myObj, 1, 2)(3);
