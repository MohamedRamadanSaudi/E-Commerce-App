const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  let tramsporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined tramsport object
  let info = await tramsporter.sendMail({
    from: process.env.EMAIL,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

module.exports = { sendEmail };
