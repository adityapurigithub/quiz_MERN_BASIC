import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { db } from "./config/mongoose.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

app.listen(port, (err) => {
  if (err) {
    console.error.bind(`Err in setting up server...${err}`);
    return;
  }
  console.log(`Server up on PORT...${port}`);
});
