import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import userRouter from './routers/user.js';
import loginRouter from './routers/login.js';
import signupRouter from './routers/signup.js';
import otpRouter from './routers/otp.js';
import accountRouter from './routers/account.js';
import incomeRouter from './routers/income.js';
import expenseRouter from './routers/expense.js';
import ICRounter from './routers/incomeCategory.js';
import ECRounter from './routers/expenseCategory.js';
const server = express();

// DB Connections
const main = async () => {
    await mongoose.connect(process.env.MONGO_URL);
}
main()
.then(()=>{console.log('DB Connected')})
.catch((err) => { console.log('Error occuered!', err) });


// Middle Wares
server.use(cors());
server.use(express.json());
server.use(express.static(process.env.PUBLIC_DIR));
server.use('/api/user', userRouter);
server.use('/api/login', loginRouter);
server.use('/api/signup', signupRouter);
server.use('/api/otp', otpRouter);
server.use('/api/account', accountRouter);
server.use('/api/income', incomeRouter);
server.use('/api/expense', expenseRouter);
server.use('/api/IC', ICRounter);
server.use('/api/EC', ECRounter);
server.use('*',(req,res)=>{
    res.sendFile(path.resolve(process.env.PUBLIC_DIR , 'index.html'));
})

// Starting Server
const startServer = async () => {
    server.listen(process.env.PORT, () => {});
}

startServer()
.then(()=>{console.log('Server Started')})
.catch(()=>{console.log('Error')});