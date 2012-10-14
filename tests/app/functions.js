if (typeof define !== 'function') { var define = require('amdefine')(module); }
if (typeof expect !== 'function') { var expect = require('expect.js'); }

define([
  'use!underscore',
  'app/functions'
], function(_, answers) {

  describe("functions", function() {
    var sayItCalled = false;
    var sayIt = function(greeting, name, punctuation) {
          sayItCalled = true;
          return greeting + ', ' + name + (punctuation || '!');
        };

    beforeEach(function () {
      sayItCalled = false;
    });

    it("you should be able to use an array as arguments when calling a function", function() {
      var result = sayIt.apply(this, [ 'Hello', 'Ellie', '!' ] );

      expect(result).to.be('Hello, Ellie!');
      expect(sayItCalled).to.be.ok();
    });

    it("you should be able to change the context in which a function is called", function() {
      var speak = function() {
            return sayIt(this.greeting, this.name, '!!!');
          },
          obj = {
            greeting : 'Hello',
            name : 'Rebecca'
          };

	 obj.sayIt = speak;
	 var result = obj.sayIt();
      expect(result).to.be('Hello, Rebecca!!!');
      expect(sayItCalled).to.be.ok();
    });

    it("you should be able to return a function from a function", function() {
	var functionWrapper = function(param1) {
		return function(param2) {
			return param1 + ', ' + param2;
		};
	}

      expect( functionWrapper('Hello')('world') ).to.be('Hello, world');

      expect( functionWrapper('Hai') ('can i haz funxtion?')).to.be('Hai, can i haz funxtion?');
    });

    it('you should be able to use closures', function () {
      var arr = [ Math.random(), Math.random(), Math.random(), Math.random() ];

	var makeClosures = function(arr, doStuffFunction) {
      	var funcs = [];

	      var functionWrapped = function(num) {
		 	return function() { return doStuffFunction(num); };
	      };

      	for (var i = 0, len = arr.length; i < len; i++) {
        		funcs.push(functionWrapped(arr[i]));
      	}

      	return funcs;
    	}

      var doSomeStuff;

      doSomeStuff = function (x) { return x * x; };

      var funcs = makeClosures(arr, doSomeStuff);
      expect(funcs).to.have.length(arr.length);

      for (var i = 0; i < arr.length; i++) {
        expect(funcs[i]()).to.be(doSomeStuff(arr[i]));
      }
    });

    it("you should be able to create a 'partial' function", function() {

	var firstFunction = function(segondFunction, str1, str2) {
      	return function(str3) {
	     		return segondFunction.call(null, str1, str2, str3);
      	};
    	}

      var partial = firstFunction(sayIt, 'Hello', 'Ellie');
      expect(partial('!!!')).to.be('Hello, Ellie!!!');
      expect(sayItCalled).to.be.ok();
    });

    it("you should be able to use arguments", function () {
      var a = Math.random(),
          b = Math.random(),
          c = Math.random(),
          d = Math.random();

	var useArguments = function () {
		var sum = 0;

		var i=0;
		while (i<arguments.length) {
			sum = sum + arguments[i];
			i=i+1;
		}
		return sum;
	}

      expect(useArguments(a)).to.be(a);
      expect(useArguments(a, b)).to.be(a + b);
      expect(useArguments(a, b, c)).to.be(a + b + c);
      expect(useArguments(a, b, c, d)).to.be(a + b + c + d);
    });

    it("you should be able to apply functions with arbitrary numbers of arguments", function () {
      (function () {
        var a = Math.random(), b = Math.random(), c = Math.random();

        var wasITake2ArgumentsCalled = false;
        var iTake2Arguments = function (firstArgument, secondArgument) {
          expect(arguments.length).to.be(2);
          expect(firstArgument).to.be(a);
          expect(secondArgument).to.be(b);

          wasITake2ArgumentsCalled = true;
        };

        var wasITake3ArgumentsCalled = false;
        var iTake3Arguments = function (firstArgument, secondArgument, thirdArgument) {
          expect(arguments.length).to.be(3);
          expect(firstArgument).to.be(a);
          expect(secondArgument).to.be(b);
          expect(thirdArgument).to.be(c);

          wasITake3ArgumentsCalled = true;
        };

	function callIt (funct) {		
		//Arguments is not an array so it can't be done.
		//var newArgs = arguments.slice (1, arguments.length-1);
		//Convert it into an array.
		var newArgs = Array.prototype.slice.call(arguments, 1, arguments.length);

		funct.apply(null, newArgs);
	}

        callIt(iTake2Arguments, a, b);
        callIt(iTake3Arguments, a, b, c);

        expect(wasITake2ArgumentsCalled).to.be.ok();
        expect(wasITake3ArgumentsCalled).to.be.ok();
      })();
    });

    it("you should be able to curry existing functions", function () {
      var curryMe = function (x, y, z) {
        return x / y * z;
      };

	var curryIt = function(funct) {
     		var firstArgs = Array.prototype.slice.call(arguments, 1, arguments.length);
      		return function() {
			var allArgs = firstArgs.concat(Array.prototype.slice.call(arguments));
			return funct.apply(null, allArgs);
      		};
    	}

      var a = Math.random(), b = Math.random(), c = Math.random();
      expect(curryIt(curryMe)(a, b, c)).to.be(curryMe(a, b, c));
      expect(curryIt(curryMe, a)(b, c)).to.be(curryMe(a, b, c));
      expect(curryIt(curryMe, a, b)(c)).to.be(curryMe(a, b, c));
      expect(curryIt(curryMe, a, b, c)()).to.be(curryMe(a, b, c));
      expect(curryIt(curryMe, b, a, c)()).to.be(curryMe(b, a, c));
    });
  });
});
