if (typeof define !== 'function') { var define = require('amdefine')(module); }
if (typeof expect !== 'function') { var expect = require('expect.js'); }

define([
  'app/arrays'
], function(answers) {
  describe("arrays", function() {
    var a;

    beforeEach(function() {
      a = [ 1, 2, 3, 4 ];
    });

    it("you should be able to determine the location of an item in an array", function() {
      expect( a[1] ).to.be(2);
      expect( a.indexOf(5) ).to.be(-1);
    });

    it("you should be able to add the values of an array", function() {
      expect( a[0] + a[1] + a[2] + a[3] ).to.be(10);
    });

    it("you should be able to remove a value from an array", function() {
      a.push(2); // Make sure the value appears more than one time
	
	while (a.indexOf(2)!=-1) {
		a.splice(a.indexOf(2),1);
	}
	var result = a;

      expect(result).to.have.length(3);
      expect(result.join(' ')).to.be('1 3 4');
    });

    it("you should be able to remove a value from an array, returning the original array", function() {
      a.push( 2 );

	while (a.indexOf(2)!=-1) {
		a.splice (a.indexOf(2),1);
	}
	var result = a;
	
      expect(result).to.have.length(3);
      expect(result.join(' ')).to.be('1 3 4');

      // make sure that you return the same array instance
      expect(result).equal(a);
    });

    it("you should be able to add an item to the end of an array", function() {
      var result = a;
	 result.push(10);

      expect(result).to.have.length(5);
      expect(result[result.length - 1]).to.be(10);
    });

    it("you should be able to remove the last item of an array", function() {
      var result = a;
	 result.pop();

      expect(result).to.have.length(3);
      expect(result.join(' ')).to.be('1 2 3');
    });

    it("you should be able to join together two arrays", function() {
      var c = [ 'a', 'b', 'c', 1 ],
      result = a.concat(c);

      expect(result).to.have.length(8);
      expect(result.join(' ')).to.be('1 2 3 4 a b c 1');
    });

    it("you should be able to add an item anywhere in an array", function() {
      a.splice(2, 0, 'z');
	 var result = a;

      expect(result).to.have.length(5);
      expect(result.join(' ')).to.be('1 2 z 3 4');
    });

    it("you should be able to count the occurences of an item in an array", function() {
	var arrayWithElementsToCount = [ 1, 1, 1, 2, 1, 3 ];
	var elementToCount = 1;
	
	var result = 0;
	var i = 0;
	while ( i<=arrayWithElementsToCount.length-1 ) {
		if ( arrayWithElementsToCount[i]==elementToCount ) {
			result = result + 1;
		}
		i=i+1;
	}

      expect(result).to.be(4);
    });

    it("you should be able to find duplicates in an array", function() {
	var arrayWithDuplicates = [ 1, 2, 4, 4, 3, 3, 1, 5 ];
     var result = new Array();
	
	var i = 0;
	var j = 0;
	while (i<arrayWithDuplicates.length) {
		if (result.indexOf(arrayWithDuplicates[i])==-1) {
			j=i+1;
			var duplicated = false;
			while ( j<arrayWithDuplicates.length && !duplicated ) {
				if (arrayWithDuplicates[i]==arrayWithDuplicates[j]) {
					result.push( arrayWithDuplicates[i] );
					duplicated = true;
				}
				j = j+1;
			}
		}
		i = i+1;
	}

      expect(result).to.have.length(3);
      expect(result.sort().join(' ')).to.be('1 3 4');
    });

    it("you should be able to square each number in an array", function() {
      var result = a;

	var i=0;
	while (i<result.length) {
		result.splice(i, 1, result[i]*result[i]);
		i=i+1;
	}

      expect(result).to.have.length(4);
      expect(result.join(' ')).to.be('1 4 9 16');
    });

    it("you should be able to find all occurrences of an item in an array", function() {
     var array = 'abcdefabc'.split('');
	var result = new Array();

	var i=0;
	while (i<array.length) {
		if (array[i]=='a') {
			result.push(i);
		}
		i=i+1;
	}

      expect(result.join(' ')).to.be('0 6');
    });

  });
});
