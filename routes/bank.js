import express from "express";
import {
  create,
  bankByID,
  getCountBank_class,
  getbank,
  listbank,
  update,
} from "../controllers/bank.js";
import { canViewBank } from '../controllers/bank.js';

const router = express.Router();
// Lấy bank_id từ url
router.param("bankId", bankByID);
// Chưa dùng
router.post("/bank/create", create);
// Update bank_info
router.put("/bank/update", update);
// View bank_table, và phân quyền view
router.get("/bank/list", canViewBank, listbank);
// View bank_info, và phân quyền view
router.get("/bank/get/:bankId",canViewBank, getbank);
// View count trong bank_class
router.get("/getbank/count", getCountBank_class);

export default router;