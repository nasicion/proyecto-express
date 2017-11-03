const nodemailer = require('nodemailer');


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {
sendEmail = function(email, password, callback) {

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jqyd7evgcutqqm47@ethereal.email',
            pass: 'BA97nkrqueVHpG9FQP'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Proyecto lista de tareas" <no-replay@proyectolistadetareas.edu>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: password, // plain text body
        html: `<h1>Your password is</h1><br><b>${password}</b>` // html body
    };

    // send mail with defined transport object
    return transporter.sendMail(mailOptions, callback);
//});
}

module.exports.sendEmail = sendEmail;