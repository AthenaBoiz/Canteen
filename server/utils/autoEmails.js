var nodemailer = require('nodemailer');

var user = process.env.GMAIL_UN || require('../.config/.secrets.json')['email']['address'];
var pw = process.env.GMAIL_PW || require('../.config/.secrets.json')['email']['password'];
var transportString = 'smtps://' + user + ':' + pw + '%40smtp.gmail.com';
var host = process.env.HOST || 'localhost:3333';

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: user,
    pass: pw
  }
});

function addedToTripMsg(trip) {
  var recipients = '';
  trip.members.forEach(function(recip) {
    recipients += recip.email + ', ';
  });
  var htmlString = '<h4>Hello! Someone has invited you ' + trip.tripName + ' in ' + trip.location + '.</h4><p>Please check out <a href="http://' + host + '/#/trip/' + trip._id + '">the trip page</a> for more information!';
  var mailOptions = {
    to: recipients,
    subject: "You've been invited to " + trip.tripName,
    html: htmlString
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Message sent: ' + info.response);
  });
}

module.exports = {
  addedToTripMsg: addedToTripMsg
};
