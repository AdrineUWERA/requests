import express from "express";
import requestControllers from "../controllers/request.controller";
import { asyncWrapper } from "../helpers";

import { validate, validateParams, isAuthenticated } from "../middlewares";

import { paramsSchemas, requestSchemas } from "../utils";

const requestRouter = express.Router();

requestRouter.post(
  "/requests/send/:receiverId",
  isAuthenticated,
  validateParams(paramsSchemas.receiverIdSchema),
  validate(requestSchemas.RequestSchema),
  requestControllers.sendRequest
);

requestRouter.get(
  "/requests/:id",
  isAuthenticated,
  validateParams(paramsSchemas.requestIdSchema),
  requestControllers.getRequestDetails
);

requestRouter.post(
  "/requests/:id/comments",
  isAuthenticated,
  validateParams(paramsSchemas.requestIdSchema),
  requestControllers.commenting
);

requestRouter.get(
  "/sender/requests",
  isAuthenticated,
  requestControllers.getUserRequest
);

requestRouter.get(
  "/receiver/requests",
  isAuthenticated,
  requestControllers.getReceiverRequest
);

export default requestRouter;
