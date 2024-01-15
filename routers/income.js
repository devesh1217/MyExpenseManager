import express from 'express';
import income from '../controllers/income.js'
import account from '../controllers/account.js';

const incomeRouter = express.Router();

incomeRouter
    .post('/', income.create)
    .post('/get', income.getByDate)
    .post('/total', income.total)
    .post('/monthly/get', income.monthlyData)
    .post('/monthly/total', income.monthlyTotal)
    .post('/yearly/get', income.yearlyData)
    .post('/yearly/total', income.yearlyTotal)
    .post('/charts/monthly', income.monthlyCharts)
    .post('/charts/yearly', income.yearlyCharts)
// .post('/',income.create,account.balance,account.updateBalance)
// .get('/:id',UserController.getOne)
// .put('/:id',UserController.replace)
// .patch('/:id',UserController.update)
// .delete('/:id',UserController.delete);


export default incomeRouter;