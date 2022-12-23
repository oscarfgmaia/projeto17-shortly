import { Router } from "express";
import {
  getUrlById,
  foundUrlByShortUrl,
  deleteUrlById,
  rankUrlsByView,
} from "../controllers/url.controllers.js";
import authorizationValidate from "../middlewares/authorization.validate.js";
const router = Router();

router.get("/urls/:id", getUrlById);
router.delete("/urls/:id", authorizationValidate, deleteUrlById);
router.get("/urls/open/:shortUrl", foundUrlByShortUrl);
router.get("/ranking", rankUrlsByView);
export default router;
