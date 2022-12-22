import { Router } from "express";
import { signUp, getAllUsers } from "../controllers/user.controllers.js";
import userValidate from "../middlewares/user.validate.js";
const router = Router();

router.post("/user", userValidate, signUp);
router.get("/user", getAllUsers);

export default router;
