import express from 'express';
import { create, ebayorderByID, getebayorder, listebayorder, update } from '../controllers/ebayorder.js';
import { canViewEbayorder } from '../controllers/ebayorder.js';
const router = express.Router();

router.param("ebayorderId", ebayorderByID);
router.post('/ebayorder/create', create);
router.put('/ebayorder/update', update)
router.get('/ebayorder/list',canViewEbayorder, listebayorder)
router.get('/ebayorder/get/:ebayorderId',canViewEbayorder, getebayorder)

export default router;