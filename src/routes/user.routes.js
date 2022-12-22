import { Router } from "express";
import { signUp, signIn } from "../controllers/user.controllers.js";
import userValidate from "../middlewares/user.validate.js";
import loginValidate from "../middlewares/userLogin.validate.js";
const router = Router();

router.post("/signup", userValidate, signUp);
router.post("/signin", loginValidate, signIn);

export default router;
