var restify = require('restify');
var mongo = require('mongodb').MongoClient;
var pings = require('./routes/pings.njs');

// Init restify server
var server = restify.createServer();
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

mongo.connect('mongodb://localhost:27017/bitstorm?w=0', function(err, db) {
	if (err)
		throw err;

	console.log('connected to bitstorm db');

	// Init DAO objects
	pings.setDb(db);
});


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
