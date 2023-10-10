import express from "express";
import userControllers from "../controllers/user.controller";
import { asyncWrapper } from "../helpers";

import {
  userMiddleware,
  validate,
  validateParams,
  isAuthenticated,
} from "../middlewares";

import { paramsSchemas, authSchemas } from "../utils";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  validate(authSchemas.SignUpSchema),
  userMiddleware.userEmailExists,
  asyncWrapper(userControllers.signup)
);

userRouter.post(
  "/login",
  validate(authSchemas.LoginSchema),
  asyncWrapper(userControllers.login)
);

userRouter.patch(
  "/tfa-enable-disable",
  isAuthenticated,
  asyncWrapper(userControllers.tfaEnableDisable)
);

userRouter.post(
  "/verify/:email",
  validateParams(paramsSchemas.emailParamSchema),
  userMiddleware.userEmailExistsProceed,
  asyncWrapper(userControllers.verifyOTP)
);

userRouter.get("/receivers", isAuthenticated, asyncWrapper(userControllers.getAllReceivers));

export default userRouter;
