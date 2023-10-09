import { userServices } from "../../services";

const userEmailExists = async (req, res, next) => {
  if (req.body.email) {
    const user = await userServices.getUserByEmail(req.body.email);
    if (!user) {
      return next();
    }
    return res.status(409).json({ code: 409, message: "Email Exists." });
  }
  return next();
};
const userExists = async (req, res, next) => {
  if (req.params.id) {
    const user = await userServices.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }
  }
  return next();
};

const userEmailExistsProceed = async (req, res, next) => {
    const user = await userServices.getUserByEmail(req.params.email);
    if (user) { 
      return next();
    }
    return res.status(409).json({ code: 409, message: "Email doesn't exist." });
};


const userWithIdExistsProceed = async (req, res, next) => {
  const user = await userServices.getUserById(req.params.id);
  if (user) {
    return next();
  }
  return res
    .status(409)
    .json({ code: 409, message: "User doesn't exist." });
};

export default{
  userEmailExists,
  userEmailExistsProceed,
  userWithIdExistsProceed,
  userExists
};
