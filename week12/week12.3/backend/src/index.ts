import express from "express";
const app = express();
import { PORT } from "./config/config";
import apiRouter from "./routes/index";
import cors from "cors";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
