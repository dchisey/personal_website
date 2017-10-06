//set up the app by requiring Express.js

var express = require('express'),
	mongoose = require('mongoose'),
	Contact = require('./app/model/model'),
	app = express(),
	bodyParser = require('body-parser'),
	routes = require('./app/routes/routes'),
	port = process.env.PORT || 3000;

//configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//send index.html files
app.use(express.static('public'));

//bring in the route tree
app.use(routes);

//set up Mongoose promises - url connection
// mongoose.Promise = global.Promise;
// mongo.connect('mongodb://localhost')


app.listen(port, function(req, res) {
	console.log('Server listening on port ' + port);
})
