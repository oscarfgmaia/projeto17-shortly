import { Router } from "express";
import {
  getUrlById,
  foundUrlByShortUrl,
} from "../controllers/url.controllers.js";
const router = Router();

router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", foundUrlByShortUrl);
export default router;
