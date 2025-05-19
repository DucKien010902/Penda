import express from 'express';
import { isAdmin, isAuth, requireSignin } from '../controllers/auth.js';
import { create, contactByID, list, read, remove } from '../controllers/contact.js';

const router = express.Router();

// Lấy param

router.param("contactID", contactByID);


// Danh sách liên hệ

router.get("/contacts", list);

// Chi tiết liên hệ

router.get('/contact/:contactId', read);

// Thêm liên hệ

router.post('/contact',  create)

// Xóa liên hệ

router.delete('/contact/:contactId',  remove);





export default router;