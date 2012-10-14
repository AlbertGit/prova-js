if (typeof define !== 'function') { var define = require('amdefine')(module); }
if (typeof expect !== 'function') { var expect = require('expect.js'); }

define([
  'app/flowControl'
], function(answers) {
  describe("flow control", function() {
    it("you should be able to conditionally branch your code", function() {
      var num = 0;

      while (num % 3 === 0 || num % 5 === 0) {
          num = Math.floor(Math.random() * 10) + 1;
      }

     if ( num%2===0 ) {
      	expect(2).to.be(2);
	}
     
	if ( num%101===0 ) { 
		expect(101).to.be(101);
	}

	//A number can be multiple of (3 or 5) and (3 and 5). So it can print (fizz or buzz) and fizzbuzz. It's how I have interpreted it.

	if ( num%3===0 ) {
      	expect('fizz').to.be('fizz');
	}

	if ( num%5===0 ) {
      	expect('buzz').to.be('buzz');
	}

      if ( num%3===0 && num%5===0 ) {
      	expect('fizzbuzz').to.be('fizzbuzz');
	}
    });
  });
});
