import express from 'express';
import login from '../controllers/login.js'

const loginRouter = express.Router();

loginRouter
    .post('/',login.validate);

export default loginRouter;