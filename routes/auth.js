import express from 'express';
const router = express.Router();

import { signup, signin, signout, verify } from '../controllers/auth.js';

// Authorziation: `Bearer ${token}`



router.post('/signup' , signup);
router.post('/signin', signin)
router.get('/signout', signout);
router.post('/verify', verify);
// router.get('/disconnect', signout);



export default router;



