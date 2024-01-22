import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import userSchema from '../model/user.js'
import accountSchema from '../model/account.js'

const signupRoute = {
    create: async (req, res) => {
        const pswd = bcrypt.hashSync(req.body.password,Number(process.env.SALT_ROUND));
        const data = new userSchema({...req.body,password:pswd});
        const acc = new accountSchema({
            userId:req.body.userId,
            accountId: 'A1',
            accountName: 'Wallet',
            accountDesc: 'Cash',
            accountOpeningDate: new Date(),
            openingBalance: req.body.openingBalance,
            currentBalance: req.body.openingBalance
        })
        await data.save()
        .then((doc)=>{
            acc.save();
        })
        .then((doc)=>{
            try{
                var token = jwt.sign(
                    { userId: req.body.userId},
                    process.env.PRIVATE_KEY
                );
                res.status(201).json({token,userId:data.userId});
            }catch(err){
                console.log(err)
                res.sendStatus(500);
            }
        }).catch((err)=>{
            console.log(err)
            res.sendStatus(500);
        });
    },
    validateUserId: async (req,res)=>{
        await userSchema.findOne({userId:req.params.id})
        .then((doc)=>{
            if(doc)
                res.status(200).json({isValid:false})
            else
                res.status(200).json({isValid:true})
        }).catch((err)=>{
            res.sendStatus(404);
        })
    },
    validateEmail: async (req,res)=>{
        await userSchema.findOne({email:req.params.email})
        .then((doc)=>{
            if(doc)
                res.status(200).json({isValid:false})
            else
                res.status(200).json({isValid:true})
        }).catch((err)=>{
            res.sendStatus(404);
        })
    }
}

export default signupRoute;