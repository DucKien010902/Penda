import express from "express";
import { content, create,update, list } from '../controllers/blog.js';
const router = express.Router();
router.post("/blog/create", create);
router.post("/blog/update", update);
router.get("/blog/list", list);
router.get("/blog/content/:id", content);

export default router;
