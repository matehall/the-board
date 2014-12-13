var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/MySensorsDb", {
	native_parser : true
});


var sensors = [ {
	id : 'Value-3-0',
	name : 'Sensor 30',
}, {
	id : 'Value-2-0',
	name : 'Sensor 20',
}, {
	id : 'Value-2-1',
	name : 'Sensor 21',
}, {
	id : 'Value-1-0',
	name : 'Sensor 2 ',
}, {
	id : 'Value-5-0',
	name : 'Sensor 50',
}, {
	id : 'Value-5-2',
	name : 'Sensor 51',
}, {
	id : 'Value-5-2',
	name : 'Sensor 52',
}, ];

function getLatestTemp(sensorId) {
	//var db = req.db;
	db.collection(sensorId).
	find().
	sort({_id : -1}).
	limit(1).
	toArray(
			function(err, items) {
				res.json(items);
				}
			);
	}

exports.getSensorsNames = function() {
	return {
		sensors : sensors,
	}
};

exports.getSensorsValues = function() {
	return {
		sensors : sensors,
	}
};

// exports.getSensorValues = function() {
// var result =[];
// sensorNames.forEach(function(element, index, array) {
// result[result.length] = element.name;

// return sensorNames;
// };
// )
// };
