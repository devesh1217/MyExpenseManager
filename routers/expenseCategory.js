import express from 'express';
import EC from '../controllers/expenseCategory.js'

const ECRouter = express.Router();

ECRouter
    .get('/',EC.getAllName)
    .get('/:id', EC.getURL)


export default ECRouter;