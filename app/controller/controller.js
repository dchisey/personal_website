var nodemailer = require('nodemailer');

exports.send_email_on_submission = function(req, res) {
	let message = req.body;

	let transporter = nodemailer.createTransport({
		host: 'smtp.mail.yahoo.com',
		port: 587,
		secure: false,
		auth: {
			user: 'danhiseywebsite',
			pass: 'euyaagerqtiebxqk'
		}
	});

	let email = {
		from: 'danhiseywebsite@yahoo.com',
		to: 'dchisey@gmail.com',
		subject: `${message.firstName} ${message.lastName} sent you a message`,
		html: `<h1>${message.firstName} ${message.lastName} from ${message.company} (${message.email}) contacted you about ${message.reason}</h1><br><p>${message.message}</p>`
	}

	transporter.verify(function(error, success) {
		if (error) {
			console.log('Connection failed.')
		} else {
			console.log('The email server connection is live.')
		}
	})

	transporter.sendMail(email, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log(info.response);
		}
	});
}