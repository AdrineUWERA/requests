import Joi from "joi";
import errorMessage from "../errormessage";

const userIdSchema = Joi.object().keys({
  id: Joi.string().uuid().messages(errorMessage("User Id")),
});

const emailParamSchema = Joi.object().keys({
  email: Joi.string().email().required().messages(errorMessage("Email")),
});

export default {
  userIdSchema,
  emailParamSchema,
};
