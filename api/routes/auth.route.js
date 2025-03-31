import express from 'express';
import { signup } from '../controllers/auth.controller.js'; // Import the signup function from the controller

const router = express.Router();

router.post('/signup', signup);

export default router;