import userSchema from '../model/user.js'
import accountSchema from '../model/account.js'

const signupRoute = {
    create: async (req, res) => {
        const data = new userSchema(req.body);
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
            res.sendStatus(201);
        }).catch((err)=>{
            res.sendStatus(404);
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
    }
}

export default signupRoute;