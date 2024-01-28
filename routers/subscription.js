import express from 'express';
import subscriptionRoute from '../controllers/subscription.js';

const subscriptionRouter = express.Router();

subscriptionRouter
    .post('/save',subscriptionRoute.save)
    .post('/send',subscriptionRoute.send)

export default subscriptionRouter;