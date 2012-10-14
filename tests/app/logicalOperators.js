if (typeof define !== 'function') { var define = require('amdefine')(module); }
if (typeof expect !== 'function') { var expect = require('expect.js'); }

define([
  'app/logicalOperators'
], function(answers) {  
  describe("logical operators", function(){ 
    it("you should be able to work with logical and", function() {
      expect( false&&false ).not.to.be.ok();
      expect( true&&false ).not.to.be.ok();
      expect( true&&true ).to.be.ok();
    });
    
    it("you should be able to work with logical or", function() {
      expect( true||false ).to.be.ok();
      expect( true||true ).to.be.ok();
      expect( false||false ).not.to.be.ok();
    });
  });
});