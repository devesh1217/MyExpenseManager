import userSchema from '../model/user.js'
import webpush from 'web-push'

const keys = {
    PublicKey:'BNOGUi-eC2wjhs2_v78dkfp8IMriCQRuwnuAWGEMTNLrIPMvnYveaz7dcIno3q-1TQdmKFwO1fBRxpvstObVMec',
    PrivateKey: 'Q6u-9wkxYZZUEaErQ6pxhKeMVB1_BsxgKdwfH8qSeXQ'
}

webpush.setVapidDetails(
    'mailto:u22cs035@coed.svnit.ac.in',
    keys.PublicKey,
    keys.PrivateKey
)

const subscriptionRoute = {
    save:async (req,res)=>{
        const data = (req.body);
        console.log(req.body)
        userSchema.updateOne({userId:data.userId},{subscription: data.subscription})
        .then(doc=>{
            res.json({success:true});
        }).catch(err=>{
            console.log(err);
            res.status(500).json({success:false});
        })
    },
    send:async (req,res)=>{
        try{
            const user= await userSchema.findOne({userId:req.body.userId});
            await webpush.sendNotification(user.subscription,JSON.stringify(req.body.data));
            res.json({success:true});
        }catch(err){
            console.log(err)
            res.json({success:false});
        }
    }
}

export default subscriptionRoute;