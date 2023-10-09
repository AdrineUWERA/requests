import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ email, subject, content }) {
  const msg = {
    to: email,
    from: process.env.SENDER,
    subject,
    text: 'Hi',
    html: content,
  };
  sgMail.send(msg);
}

export default sendEmail;
