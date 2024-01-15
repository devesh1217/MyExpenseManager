import userSchema from '../model/user.js'

const loginRoute = {
    validate: async (req, res) => {
        const id = req.body.id;
        const pswd = req.body.password;
        await userSchema.findOne({userId:id,password:pswd},{userId:1,_id:0})
        .then((doc)=>{
            if(doc)
                res.status(200).json({isValid:true})
            else
                res.status(200).json({isValid:false})
        }).catch((err)=>{
            res.status(404).send('Error Occuered')
        });
    }
}


export default loginRoute;