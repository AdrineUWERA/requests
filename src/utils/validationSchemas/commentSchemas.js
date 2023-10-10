import Joi from "joi";
import errorMessage from "../errormessage";

const CommentSchema = Joi.object().keys({ 
  comment: Joi.string().required().messages(errorMessage("Comment")),
});

export default { CommentSchema };
