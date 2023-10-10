import express from "express";
import userRouter from "./user.route";
import requestRouter from "./request.route";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Requests Management System" });
});

router.use("/users", userRouter);
router.use("/", requestRouter);

export default router;
