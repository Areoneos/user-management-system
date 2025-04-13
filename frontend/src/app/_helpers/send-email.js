const nodemailer = require('nodemailer');
const config = require('config.json');

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = config.emailFrom }) {
    const transportConfig = {
        ...config.smtpOptions,
        tls: {
            rejectUnauthorized: false
        }
    };
    const transporter = nodemailer.createTransport(transportConfig);
    await transporter.sendMail({ from, to, subject, html });
}