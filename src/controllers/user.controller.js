import { passwordUtils, tokenUtils } from "../utils";
import { userServices, twoFactorAuth } from "../services";
import { asyncWrapper, redisClient } from "../helpers";

const signup = async (req, res) => {
  const hashedPassword = await passwordUtils.hashPassword(req.body.password);
  const details = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  };
  const user = await userServices.createUser(details);
  const body = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };
  const token = tokenUtils.generateToken(body);
  return res
    .status(201)
    .json({ code: 201, message: "User created", token, user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await userServices.getUserByEmail(email);
  if (userExists) {
    if (await passwordUtils.comparePassword(password, userExists.password)) {
      const body = {
        id: userExists.id,
        email: userExists.email,
        fullName: userExists.fullName,
        role: userExists.role,
      };
      if (userExists.tfa_enabled === true) {
        return twoFactorAuth(res, userExists);
      }
      const token = tokenUtils.generateToken(body);
      return res
        .status(200)
        .json({ code: 200, message: "Logged in successfully", token });
    } else {
      return res
        .status(401)
        .json({ code: 401, message: "Password is incorrect" });
    }
  } else {
    return res.status(404).json({ code: 404, message: "User not found" });
  }
};

const verifyOTP = asyncWrapper(async (req, res) => {
  const { verificationCode } = req.body;
  const { email } = req.params;
  const result = await redisClient.get(email, (err, data) => data);
  const redisOTP = result.split("=")[0];
  const redisToken = result.split("=")[1];

  if (redisOTP === verificationCode) {
    const user = tokenUtils.decodeToken(redisToken);
    req.user = user;
    return res
      .status(200)
      .header("authenticate", redisToken)
      .json({
        code: 200,
        message: `Logged In Successfully as ${req.user.fullName} .`,
        token: redisToken,
      });
  }

  return res.status(406).header("authenticate", redisToken).json({
    code: 406,
    message: `Invalid Otp.`,
  });
});

const tfaEnableDisable = async (req, res) => {
  const { user } = req;
  const userDetails = await userServices.getUserById(user.id);
  if (!userDetails.tfa_enabled) {
    userServices.enableTFA(user.id);
    return res.status(200).json({
      code: 200,
      message: `TFA enabled successfully`,
    });
  }
  userServices.disableTFA(user.id);
  return res.status(200).json({
    code: 200,
    message: `TFA disabled successfully`,
  });
};

const getAllReceivers = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;
  const { users, count } = await userServices.getReceivers({
    offset,
    limit,
  });
  const totalPages = Math.ceil(count / limit);
  return res.status(200).json({
    code: 200,
    message: "All receivers fetched",
    users,
    page,
    totalPages: totalPages === 0 ? 1 : totalPages,
    totalCount: count,
  });
};

export default {
  signup,
  login,
  verifyOTP,
  tfaEnableDisable,
  getAllReceivers,
};
