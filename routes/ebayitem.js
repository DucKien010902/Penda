import express from 'express';
import { create, ebayitemByID, getebayitem, listebayitem, update } from '../controllers/ebayitem.js';
import { canViewEbayitem } from '../controllers/ebayitem.js';
const router = express.Router();

router.param("ebayitemId", ebayitemByID);
router.post('/ebayitem/create', create);
router.put('/ebayitem/update', update)
router.get('/ebayitem/list',canViewEbayitem, listebayitem)
router.get('/ebayitem/get/:ebayitemId',canViewEbayitem, getebayitem)
export default router;