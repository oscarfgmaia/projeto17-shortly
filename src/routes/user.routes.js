import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user.controllers.js";
import userValidate from "../middlewares/user.validate.js";
const router = Router();

router.post("/user", userValidate, createUser);
router.get("/user", getAllUsers);

export default router;
