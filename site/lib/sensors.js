var sensors = [ {
	id : 'Value-3-0',
	name : 'Hönshus',
}, {
	id : 'Value-2-0',
	name : 'Garage',
}, {
	id : 'Value-2-1',
	name : 'Ute',
}, {
	id : 'Value-105-0',
	name : 'Partiklar',
}, {
	id : 'Value-5-0',
	name : 'Panna',
}, {
	id : 'Value-5-2',
	name : 'Fram',
}, {
	id : 'Value-5-1',
	name : 'Retur',
}, ];


exports.getSensors = function(){
	return {
		sensors : sensors,
		}
};

exports.getSensorsIds = function() {
	var result = [];
	for (var int = 0; int < sensors.length; int++) {
		result.push(sensors[int].id);
	}
	return result;
};

exports.getNodeName = function(whanted_id) {
	var result = "";
	for (var int = 0; int < sensors.length; int++) {
		if (sensors[int].id === whanted_id ) {
			return sensors[int].name;
		}
	}
	return result;
};