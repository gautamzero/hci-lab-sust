var nodemailer = require('nodemailer');

exports.sendMail = (req, res) => {
    if (!req.body.email || !req.body.text) {
        return res.status(400).send({
            message: "Contact details cannot be empty"
        });
    }

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tanvirnihal997@gmail.com',
            pass: 'nihalcse2014'
        }
    });

    var mailOptions = {
        to: 'gautam.zero@gmail.com',
        subject: req.body.email,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({
                success: true,
                message: info.response,
            });
        }
    });
};