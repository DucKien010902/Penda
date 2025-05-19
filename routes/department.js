import express from 'express';
import { list, create, remove } from '../controllers/department.js';

const router = express.Router()


router.post('/department', create);

router.get("/departments", list);

router.post("/department/remove", remove)

export default router;
