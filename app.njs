var restify = require('restify');
var mongo = require('mongodb');
var pings = require('./routes/pings.njs');

// Init restify server
var server = restify.createServer();
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

// Open db connection
var db = new mongo.Db('bitstorm', new mongo.Server('localhost', 27017, {
	auto_reconnect : true,
	w : 'majority'
}));
db.open(function(err, db) {
	if (err)
		throw err;
	console.log('connected to bitstorm db');
});

// Init DAO objects
pings.setDb(db);


// Set routes
server.get('/pings', pings.findAll);
server.post('/pings', pings.addPing);
server.del('/pings', pings.clearPings);

// Set static files
server.get(/.*/, restify.serveStatic({
	directory: "./public",
	default: "index.html"
}));



// Setup node-static - do this last
// Listen!
server.listen('1337', function(req, res) {
	console.log('node listening at ' + server.url);	
});
