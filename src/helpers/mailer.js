import { emailServices } from '../services';

const sendTheEmail = async (mailConfigurations) => {
  await emailServices({
    email: mailConfigurations.to,
    subject: mailConfigurations.subject,
    content: mailConfigurations.html,
  }); 
  return true;
};

export default sendTheEmail;
