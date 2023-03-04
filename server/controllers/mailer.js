import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

let nodeconfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.EMAIL, // generated ethereal user
        pass: ENV.PASSWORD, // generated ethereal password
    }
}

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(nodeconfig);

let mailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "MailGen",
        link: 'https://mailgen.js'
    }
})

// send mail with defined transport object
// let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

export const registerMail = async (req, res) => {
    const { username, useremail, text, subject } = req.body;

    // body of email
    var email = {
        body: {
            name: username,
            intro: text || "Welcome, we're excited to have you onbeforeunload...!",
            outro: "Need help ? Revert back to this email, we'd love to help you."
        }
    }

    var emailBody = mailGenerator.generate(email);
    let message = {
        from: ENV.EMAIL, // sender address
        to: useremail,
        subject: subject,
        html: emailBody
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should recieve an email from us...!" })
        })
        .catch(error => {
            return res.status(500).send({ error: error })
        })
}