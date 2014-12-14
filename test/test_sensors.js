var sensors = require('../site/lib/sensors.js');
var expect = require('expect.js');

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/MySensorsDb", {
	native_parser : true
});


describe('read sensor stuff',function(){
	it('should read sensor names',function(done){
		var res = sensors.getSensorsNames();
		console.log(res);
		done();
	});
	
	it('should read sensor values',function(done){
		var res = sensors.getSensorValues(db);
		console.log(res);
		done();
	});
});
