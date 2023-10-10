import Joi from "joi";
import errorMessage from "../errormessage";

const RequestSchema = Joi.object().keys({
  subject: Joi.string().required().messages(errorMessage("Subject")),
  message: Joi.string().required().messages(errorMessage("Message")),
  type: Joi.string().required().messages(errorMessage("Request type")),
});

export default { RequestSchema };
