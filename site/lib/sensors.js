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
	id : 'Value-5-2',
	name : 'Retur',
}, ];


exports.getSensorsNames = function() {
	return {
		sensors : sensors,
	}
};