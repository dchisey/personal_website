var express = require('express'),
	router = express.Router(),
 	bodyParser = require('body-parser'),
 	controller = require('../controller/controller');

router.get('/', (req, res) => {
	res.send()
})

router.post('/formSubmission', controller.send_email_on_submission);

module.exports = router;