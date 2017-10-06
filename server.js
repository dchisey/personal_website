//set up the app by requiring Express.js

var express = require('express'),
	mongoose = require('mongoose'),
	Contact = require('./app/model/model'),
	app = express(),
	bodyParser = require('body-parser'),
	routes = require('./app/routes/routes');

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


app.listen(3000, function(req, res) {
	console.log('Server listening on port 3000.');
})
