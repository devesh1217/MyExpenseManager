import express from 'express';
import signupRoute from '../controllers/signup.js'

const signupRouter = express.Router();

signupRouter
    .post('/',signupRoute.create)
    .get('/email/:email',signupRoute.validateEmail)
    .get('/:id',signupRoute.validateUserId)

export default signupRouter;