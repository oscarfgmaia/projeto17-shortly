import { Router } from "express";
import { signUp, signIn, shortenUrl } from "../controllers/user.controllers.js";
import userValidate from "../middlewares/user.validate.js";
import loginValidate from "../middlewares/userLogin.validate.js";
import urlValidate from "../middlewares/userUrl.validate.js";

const router = Router();

router.post("/signup", userValidate, signUp);
router.post("/signin", loginValidate, signIn);
router.post("/urls/shorten", urlValidate, shortenUrl);
export default router;
