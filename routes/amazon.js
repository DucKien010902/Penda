import express from "express";
import {
  create,
  amazonByID,
  getCountAmazon_class,
  getamazon,
  listamazon,
  update,
} from "../controllers/amazon.js";
import { canViewAmazon } from '../controllers/amazon.js';

const router = express.Router();
// Lấy amazon_id từ url
router.param("amazonId", amazonByID);
// Chưa dùng
router.post("/amazon/create", create);
// Update amazon_info
router.put("/amazon/update", update);
// View amazon_table, và phân quyền view
router.get("/amazon/list", canViewAmazon, listamazon);
// View amazon_info, và phân quyền view
router.get("/amazon/get/:amazonId",canViewAmazon, getamazon);
// View count trong amazon_class
router.get("/getamazon/count", getCountAmazon_class);

export default router;