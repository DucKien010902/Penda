import express from "express";
import { update } from '../controllers/work.js';
import { canViewMail } from '../controllers/mail.js';

const router = express.Router();

router.put("/mail/updatmailWork", update);
export default router;
