if (typeof define !== 'function') { var define = require('amdefine')(module); }
if (typeof expect !== 'function') { var expect = require('expect.js'); }

define([
  'app/regex'
], function(answers) {
  describe("regular expressions", function() {
    it("you should be able to detect a number in a string", function() {
	var reExp = /[0-9]/

      expect(reExp.test('abc123')).to.be(true);
      expect(reExp.test('abc')).to.be(false);
    });

    it("you should be able to detect a repeating letter in a string", function() {
	var reExp = /([a-zA-Z])\1{1}/

      expect(reExp.test('bookkeeping')).to.be(true);
      expect(reExp.test('rattler')).to.be(true);
      expect(reExp.test('ZEPPELIN')).to.be(true);
      expect(reExp.test('cats')).to.be(false);
      expect(reExp.test('l33t')).to.be(false);
    });

    it("you should be able to determine whether a string ends with a vowel (aeiou)", function() {
	var regExp = /[aeiouAEIOU]$/

      expect(regExp.test('cats')).to.be(false);
      expect(regExp.test('gorilla')).to.be(true);
      expect(regExp.test('I KNOW KUNG FU')).to.be(true);
    });

    it("you should be able to capture the first series of three numbers", function() {
	var regExp = /\d\d\d/;

      expect( regExp.exec('abc123')==null?false:regExp.exec('abc123')[0] ).to.be('123');
      expect( regExp.exec('9876543')==null?false:regExp.exec('9876543')[0] ).to.be('987');
      expect( regExp.exec('abcdef')==null?false:regExp.exec('abcdef')[0] ).to.be(false);
      expect( regExp.exec('12ab12ab')==null?false:regExp.exec('12ab12ab')[0] ).to.be(false);
    });

    it("you should be able to determine whether a string matches a pattern", function() {
	var regExp = /^([0-9]){3}-([0-9]){3}-([0-9]){4}$/;

      // the pattern is XXX-XXX-XXXX where all X's are digits
      expect(('800-555-1212').search(regExp)!=-1?true:false).to.be(true);
      expect(('451-933-7899').search(regExp)!=-1?true:false).to.be(true);
      expect(('33-444-5555').search(regExp)!=-1?true:false).to.be(false);
      expect(('abc-def-hijk').search(regExp)!=-1?true:false).to.be(false);
      expect(('1800-555-1212').search(regExp)!=-1?true:false).to.be(false);
      expect(('800-555-12121').search(regExp)!=-1?true:false).to.be(false);
      expect(('800-5555-1212').search(regExp)!=-1?true:false).to.be(false);
      expect(('800-55-1212').search(regExp)!=-1?true:false).to.be(false);
    });

    it("you should be able to detect correctly-formatted monetary amounts in USD", function() {
	var regExp = /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/;

      expect(regExp.test('$132.03')).to.be(true);
      expect(regExp.test('$32.03')).to.be(true);
      expect(regExp.test('$2.03')).to.be(true);
      expect(regExp.test('$1,023,032.03')).to.be(true);
      expect(regExp.test('$20,933,209.93')).to.be(true);
      expect(regExp.test('$20,933,209')).to.be(true);
      expect(regExp.test('$459,049,393.21')).to.be(true);
      expect(regExp.test('34,344.34')).to.be(false);
      expect(regExp.test('$,344.34')).to.be(false);
      expect(regExp.test('$34,344.3')).to.be(false);
      expect(regExp.test('$34,344.344')).to.be(false);
      expect(regExp.test('$34,344_34')).to.be(false);
      expect(regExp.test('$3,432,12.12')).to.be(false);
      expect(regExp.test('$3,432,1,034.12')).to.be(false);
      expect(regExp.test('4$3,432,034.12')).to.be(false);
    });

  });
});