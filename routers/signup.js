import express from 'express';
import signupRoute from '../controllers/signup.js'

const signupRouter = express.Router();

signupRouter
    .post('/',signupRoute.create)
    .get('/:id',signupRoute.validateUserId)

export default signupRouter;