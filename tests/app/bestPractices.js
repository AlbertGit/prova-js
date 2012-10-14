if (typeof define !== 'function') { var define = require('amdefine')(module); }
if (typeof expect !== 'function') { var expect = require('expect.js'); }
if (typeof window !== 'object') { var window = {}; }

define([
  'app/bestPractices'
], function(answers) {
  describe("best practices", function(){
    it("you should avoid global variables", function() {
      expect(window.myObject).not.to.be.ok();
    });

    it("you should declare functions safely", function() {
      var val = function foo() { return 'b'; }

      expect( val() ).to.be('b');
    });

    it("you should use parseInt correctly", function() {
      expect(parseInt('12')).to.be(12);
      expect(parseInt('12')).to.be(12);
      expect(parseInt('12')).to.be(12);
    });

    it("you should understand strict comparison", function() {
      expect(false).to.be(false);
      expect(true).to.be(true);
      expect(false).to.be(false);
    });

  });
});
