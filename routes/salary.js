import express from "express";
import { list } from '../controllers/salary.js';


const router = express.Router();


router.get("/salary/list", list);


export default router;
