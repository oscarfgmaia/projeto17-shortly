import { Router } from "express";
import {getUrlById} from "../controllers/url.controllers.js"
const router = Router();

router.get("/urls/:id", getUrlById);
export default router;
