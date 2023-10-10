import Joi from "joi";
import errorMessage from "../errormessage";

const userIdSchema = Joi.object().keys({
  id: Joi.string().uuid().messages(errorMessage("User Id")),
});

const receiverIdSchema = Joi.object().keys({
  receiverId: Joi.string().uuid().messages(errorMessage("Receiver Id")),
});

const requestIdSchema = Joi.object().keys({
  id: Joi.string().uuid().messages(errorMessage("Request Id")),
});

const emailParamSchema = Joi.object().keys({
  email: Joi.string().email().required().messages(errorMessage("Email")),
});

export default {
  userIdSchema,
  emailParamSchema,
  requestIdSchema,
  receiverIdSchema,
};
