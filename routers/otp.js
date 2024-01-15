import express from 'express';
import otpRoute from '../controllers/otp.js';

const otpRouter = express.Router();

otpRouter
    .post('/',otpRoute.sendOTP)

export default otpRouter;