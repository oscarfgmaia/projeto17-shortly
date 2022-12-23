import { Router } from "express";
import { signUp, signIn, shortenUrl } from "../controllers/user.controllers.js";
import urlSchemaValidate from "../middlewares/urlSchema.validate.js";
import userValidate from "../middlewares/userSignUp.validate.js";
import loginValidate from "../middlewares/userLogin.validate.js";
import authorizationValidate from "../middlewares/authorization.validate.js";

const router = Router();

router.post("/signup", userValidate, signUp);
router.post("/signin", loginValidate, signIn);
router.post(
  "/urls/shorten",
  urlSchemaValidate,
  authorizationValidate,
  shortenUrl
);
export default router;
