import express from "express";
import {
  create,
  paypalByID,
  getCountPaypal_class,
  getpaypal,
  listpaypal,
  update,
} from "../controllers/paypal.js";
import { canViewPaypal } from '../controllers/paypal.js';

const router = express.Router();
// Lấy paypal_id từ url
router.param("paypalId", paypalByID);
// Chưa dùng
router.post("/paypal/create", create);
// Update paypal_info
router.put("/paypal/update", update);
// View paypal_table, và phân quyền view
router.get("/paypal/list", canViewPaypal, listpaypal);
// View paypal_info, và phân quyền view
router.get("/paypal/get/:paypalId",canViewPaypal, getpaypal);
// View count trong paypal_class
router.get("/getpaypal/count", getCountPaypal_class);

export default router;