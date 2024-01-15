import userSchema from '../model/user.js'

const userRoute = {
    create: async (req, res) => {
        const data = new userSchema(req.body);

        data.save()
            .then((doc) => {
                res.sendStatus(201);
            }).catch((err) => {
                res.sendStatus(404);
            });
    },
    getOne: async (req, res) => {
        const id = req.body.id || req.params.id;
        userSchema.findOne({ userId: id })
            .then((doc) => {
                if (doc)
                    res.status(200).json(doc);
                else
                    res.status(200).json(null);
            }).catch((err) => {
                res.sendStatus(404);
            });
    },
    list: async (req, res) => {
        const name = req.body.name || req.params.name;
        userSchema.find({ $or: [{ userId: { $regex: name, $options: 'i' } },{ userName: { $regex: name, $options: 'i' } }] })
            .then((doc) => {
                if (doc)
                    res.status(200).json(doc);
                else
                    res.status(200).json(null);
            }).catch((err) => {
                res.sendStatus(404);
            });
    },
    delete: async (req, res) => {
        const id = req.body.id;
        userSchema.deleteOne({ userId: id })
            .then((doc) => {
                if (doc.deletedCount)
                    res.status(200).json({ userDeleted: true });
                else
                    res.status(200).json(null);
            }).catch((err) => {
                res.sendStatus(404);
            });
    },
    setAccount: async (req, res) => {
        const id = req.body.id;
        const accId = req.body.accId;
        userSchema.updateOne({ userId: id }, { defaultAccount: accId })
            .then((doc) => {
                if (doc.acknowledged)
                    res.status(200).json({ userUpdated: true });
                else
                    res.status(200).json({ userUpdated: false });
            }).catch((err) => {
                res.sendStatus(404);
            });
    }
}


export default userRoute;