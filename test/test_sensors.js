var sensors = require('../site/lib/sensors.js');
var expect = require('expect.js');

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/MySensorsDb", {
	native_parser : true
});

describe('read sensor stuff', function() {
	it('should read sensor names', function(done) {
		var res = sensors.getSensorsIds();
		expect(res).to.be.an(Array);
		expect(res).to.eql([ 'Value-3-0', 'Value-2-0', 'Value-2-1',
				'Value-105-0', 'Value-5-0', 'Value-5-2', 'Value-5-2' ]);
		//consol.log(res);
		done();
	});

	it('should return Garage', function(done) {
		var res = sensors.getNodeName('Value-2-0');
		expect(res).to.eql('Garage');
		done();
	});
	
	it('should return Panna', function(done) {
		var res = sensors.getNodeName('Value-5-0');
		expect(res).to.eql('Panna');
		done();
	});
	
	it('should return empty string on not found', function(done) {
		var res = sensors.getNodeName('Not_in_array');
		expect(res).to.eql('');
		done();
	});
});
