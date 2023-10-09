import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index.js";

const app = express();
dotenv.config();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.set('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(process.env.PORT);
