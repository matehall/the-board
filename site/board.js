var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({
	defaultlayout : 'main'
});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/MySensorsDb", {
	native_parser : true
});

app.use(function(req, res, next) {
	req.db = db;
	next();
});

var fortune = require('./lib/fortune.js');
var sensors = require('./lib/sensors.js');

app.use(function(req, res, next) {
	if (!res.locals.partials){ res.locals.partials = {};
	res.locals.partials.sensors = {};
	res.locals.partials.sensors.readings = [];
	}

	db.collection('Value-2-0').find().sort({_id : -1}).limit(1).
	toArray(function(err, items) {
//		console.log("items");
//		console.log(items);
		items[items.length-1].name=sensors.getNodeName('Value-2-0');
		res.locals.partials.sensors.readings =  items;
//		console.log("items");
//		console.log(items);
	});

	var sensorNames = sensors.getSensorsIds();
//	console.log("sensorNames");
//	console.log(sensorNames);
//	console.log("length");
//	console.log(sensorNames.length);

	for (var int = 0; int < sensorNames.length; int++) {
		var sensor_name = sensorNames[int];
//		console.log("sensor_name");
//		console.log(sensor_name);

		db.collection(sensor_name).find().sort({_id : -1}).limit(1).
		toArray(function(sensor_name){
			return function(err, items) {
//				console.log("callback sensor_name");
//				console.log(sensor_name);
				items[items.length - 1].name = sensors.getNodeName(sensor_name);

				res.locals.partials.sensors.readings=res.locals.partials.sensors.readings.concat(items);
//				console.log("res.locals.partials.sensors");
//				console.log(res.locals.partials.sensors);
			}
		}(sensor_name)
		);	
	}

//	console.log("res.locals.partials.sensors");
//	console.log(res.locals.partials.sensors);
	next();
});

app.use(function(req, res, next) {
	if (!res.locals.partials) res.locals.partials = {};

	console.log("Partial")
	console.log(res.locals.partials);

	next();
});

app.get('/', function(req, res) {
	res.render('home')
})

app.get('/about', function(req, res) {
	res.render('about', {
		fortune : fortune.getFortune()
	});
})

//var db = req.db;
//res.send('test');
app.get('/temp_2', function(req, res) {
	db.collection('Value-2-1').find().sort({
		_id : -1
	}).limit(3).toArray(function(err, items) {
		if(err) throw err
		//	console.log("temp2:" + items);
		res.send(items);
	});
})

//custom 404 page
app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port')
			+ '; press Ctrl-C to terminate.');
});
