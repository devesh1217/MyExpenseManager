import express from 'express';
import expense from '../controllers/expense.js'
import income from '../controllers/income.js'

const expenseRouter = express.Router();

expenseRouter
    .post('/',expense.create,income.create)
    .post('/get',expense.getByDate)
    .post('/total',expense.total)
    .post('/monthly/total',expense.monthlyTotal)
    .post('/monthly/get',expense.monthlyData)
    .post('/yearly/total',expense.yearlyTotal)
    .post('/yearly/get',expense.yearlyData)
    .post('/charts/monthly',expense.monthlyCharts)
    .post('/charts/yearly',expense.yearlyCharts)
    // .get('/:id',UserController.getOne)
    // .put('/:id',UserController.replace)
    // .patch('/:id',UserController.update)
    // .delete('/:id',UserController.delete);


export default expenseRouter;