import express from 'express';
import user from '../controllers/user.js'

const userRouter = express.Router();

userRouter
    .post('/',user.create)
    .get('/',user.getOne)
    .get('/:id',user.getOne)
    .get('/list/:name',user.list)
    .delete('/',user.delete)
    .patch('/account/',user.setAccount);
    // .get('/',UserController.getAll)
    // .put('/:id',UserController.replace)


export default userRouter;