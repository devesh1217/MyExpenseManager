import ICSchema from '../model/incomeCategory.js'

const ICRoute = {
    getAllName: async (req,res)=>{
        await ICSchema.find({},{categoryID:1, categoryName:1, _id:0})
        .then((doc)=>{
            if(doc)
                res.status(200).json(doc);
            else
                res.status(200).json({});
        }).catch((err)=>{
            res.sendStatus(404);
        });
    },
    getURL: async (req,res)=>{
        await ICSchema.find({categoryID:req.params.id},{categoryID:1, iconURL:1, _id:0})
        .then((doc)=>{
            if(doc)
                res.status(200).json(doc);
            else
                res.status(200).json({});
        }).catch((err)=>{
            res.sendStatus(404);
        });
    }
}


export default ICRoute;