import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js'; // Import the signup function from the controller

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;