import express from "express";
import requestControllers from "../controllers/request.controller";
import { asyncWrapper } from "../helpers";

import {
  validate,
  validateParams,
  isAuthenticated,
  checkPermission,
} from "../middlewares";

import { paramsSchemas, requestSchemas } from "../utils";

const requestRouter = express.Router();

requestRouter.post(
  "/requests/send/:receiverId",
  isAuthenticated,
  validateParams(paramsSchemas.receiverIdSchema),
  validate(requestSchemas.RequestSchema),
  checkPermission("STUDENT"),
  asyncWrapper(requestControllers.sendRequest)
);

requestRouter.get(
  "/requests/:id",
  isAuthenticated,
  validateParams(paramsSchemas.requestIdSchema),
  asyncWrapper(requestControllers.getRequestDetails)
);

requestRouter.post(
  "/requests/:id/comments",
  isAuthenticated,
  validateParams(paramsSchemas.requestIdSchema),
  asyncWrapper(requestControllers.commenting)
);

requestRouter.get(
  "/sender/requests",
  isAuthenticated,
  checkPermission("STUDENT"),
  asyncWrapper(requestControllers.getUserRequest)
);

requestRouter.get(
  "/receiver/requests",
  isAuthenticated,
  checkPermission(["ADMINISTRATOR", "FACILITATOR"]),
  asyncWrapper(requestControllers.getReceiverRequest)
);

requestRouter.get(
  "/requests",
  isAuthenticated,
  // checkPermission("ADMINISTRATOR"),
  asyncWrapper(requestControllers.getAllRequest)
);

export default requestRouter;
