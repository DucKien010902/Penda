import express from "express";
import { create, createVerify, list, xuly_data } from '../controllers/timeSheet.js';


const router = express.Router();

router.post("/timeSheet/create", create);
router.get("/timeSheet/list", list);
router.post("/timeSheet/postcheck", createVerify);
router.post("/timeSheet/postcheck_xl", xuly_data);
export default router;