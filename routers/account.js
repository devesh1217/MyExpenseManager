import express from 'express';
import account from '../controllers/account.js'

const accountRouter = express.Router();

accountRouter
    .post('/',account.create)
    .get('/:id',account.getAll)
    .get('/count/:id',account.count)
    .get('/balance/:id/:accId',account.getBalance)
    .get('/name/:id/:accId',account.name)
    .get('/name/:id/',account.allName)
    // .post('/balance',account.balance,account.updateBalance)
    // .post('/update/balance',account.updateBalance)
    // .get('/',user.getOne)
    // .delete('/',user.delete)
    // .patch('/account/',user.setAccount);
    // .get('/',UserController.getAll)
    // .put('/:id',UserController.replace)


export default accountRouter;