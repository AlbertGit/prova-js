if (typeof define !== 'function') { var define = require('amdefine')(module); }
if (typeof expect !== 'function') { var expect = require('expect.js'); }

define([
  'app/async'
], function(answers) {
  describe("async behavior", function() {
    it("you should understand how to use 'promises' to handle asynchronicity", function(done) {
      var flag = false;
      var finished = 0;
      var total = 2;

      function finish(done) {
        if (++finished == total) { done(); }
      }

	var async = function(value) {
      	var dfd = $.Deferred();
      	setTimeout(function() {
        			dfd.resolve(value);
      			}, 10);
      	return dfd.promise();
    	}

      async(true).then(function(result) {
        flag = result;
        expect(flag).to.be(true);
        finish(done);
      });

      async('success').then(function(result) {
        flag = result;
        expect(flag).to.be('success');
        finish(done);
      });

      expect(flag).to.be(false);
    });

    it("you should be able to receive data from the server and manipulate it", function(done) {
      var url = '/data/testdata.json';
	var manipulateRemoteData = function(url) {
	     	 var dfd = $.Deferred();

     		 $.ajax(url).then(function(resp) {
        					var people = $.map(resp.people, function(person) {
          					return person.name;
        				});
        	dfd.resolve(people.sort());
      });

      return dfd.promise();
    }
      manipulateRemoteData(url).then(function(result) {
        expect(result).to.have.length(5);
        expect(result.join(' ')).to.be('Adam Alex Matt Paul Rebecca');
        done();
      });
    });
  });
});
