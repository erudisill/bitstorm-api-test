var mongo=require('mongodb');

var db = null;

exports.setDb = function( theDb ) {
	db = theDb;
};

exports.findAll = function(req, res, next) {
	console.log('pings: Retrieving all pings');
	db.collection('pings', function(err,c) {
		c.find().toArray(function(err, items) {
			res.send(items);
		});
	});
	return next();
};

exports.addPing = function(req, res, next) {
	var ping = req.body;
	ping._created_on = new Date();
	console.log('pings: Adding ping ' + JSON.stringify(ping));
	db.collection('pings', function(err, c) {
		c.insert(ping, function(err, result) {
			if (err) {
				res.send(new RestError('Error inserting ping'));
			}
			else {
				res.send(result[0]);
			}
		});
	});
	return next();
};

exports.clearPings = function(req, res, next) {
	console.log("pings: Clearing ALL pings");
	db.collection('pings', function(err,c) {
		c.remove();
		res.send(200);
	});
	return next();
};