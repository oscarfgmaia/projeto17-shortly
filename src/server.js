import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Running at port ${PORT}`));
