const mailer = require('nodemailer'); // module to send notification emails


const sendEmail = () => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adamjlemmon@gmail.com',
            pass: process.env.PASS;
        }
    });    

}

export default  sendEmail;





// setup email data with unicode symbols
let mailOptions = {
    from: 'Silent Echo <adamjlemmon@gmail.com>', // sender address
    to: emailAddress, // list of receivers
    subject: 'Project Silent Echo: Notification ✔', // Subject line
    text: 'Product: ' + productId + ' Event: ' + event, // plain text body
    // html: '<b>Important</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});