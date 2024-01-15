import express from 'express';
import IC from '../controllers/incomeCategory.js'

const ICRouter = express.Router();

ICRouter
    .get('/',IC.getAllName)
    .get('/:id', IC.getURL)


export default ICRouter;