import accountSchema from '../model/account.js'

const accountRoute = {
    create: async (req, res) => {
        const data = new accountSchema(req.body);
        const count = await accountSchema.aggregate([
            { $match: { userId: req.body.userId } },
            {
                $group: {
                    _id: '$userId',
                    count: { $sum: 1 }
                }
            }
        ]);
        data.accountOpeningDate = new Date();
        data.accountId = 'A' + (count[0].count + 1);
        await data.save()
            .then((doc) => {
                res.sendStatus(201);
            }).catch((err) => {
                console.log(err)
                res.sendStatus(404);
            });
    },
    getAll: async (req, res) => {
        const id = req.params.id;
        await accountSchema.find({ userId: id })
            .then((doc) => {
                if (doc)
                    res.status(200).json(doc);
                else
                    res.status(200).json({});
            }).catch((err) => {
                res.sendStatus(404);
            });
    },
    // balance: async (req, res, next) => {
    //     console.log(req.body)
    //     const id = req.body.userId;
    //     const accId = req.body.account;
    //     await accountSchema.findOne({ userId: id, accountId: accId }, { accountId: 1, currentBalance: 1, _id: 0 })
    //         .then((doc) => {
    //             console.log('bal', doc)
    //             req.body.balance = doc.currentBalance;
    //             next();
    //         }).catch((err) => {
    //             console.log('balance')
    //             res.sendStatus(404);
    //         });
    //     next()
    // },
    getBalance: async (req, res) => {
        const id = req.params.id;
        const accId = req.params.accId;
        await accountSchema.findOne({ userId: id, accountId: accId }, { accountId: 1, currentBalance: 1, _id: 0 })
            .then((doc) => {
                res.status(200).json(doc);
            }).catch((err) => {
                res.sendStatus(404);
            });
    },
    count: async (req, res) => {
        const id = req.params.id;
        await accountSchema.aggregate([
            { $match: { userId: id } },
            {
                $group: {
                    _id: '$userId',
                    count: { $sum: 1 }
                }
            }
        ])
            .then((doc) => {
                if (doc.length)
                    res.status(200).json({ count: doc[0].count });
                else
                    res.status(200).json({ count: -1 });
            }).catch((err) => {
                console.log(err)
                res.sendStatus(404);
            });
    },
    name: async (req, res) => {
        const id = req.params.id;
        const accId = req.params.accId;
        await accountSchema.findOne({ userId: id, accountId: accId }, { accountId: 1, accountName: 1, _id: 0 })
            .then((doc) => {
                if (doc)
                    res.status(200).json(doc);
                else
                    res.status(200).json({});
            }).catch((err) => {
                console.log(err)
                res.sendStatus(404);
            });
    },
    allName: async (req, res) => {
        const id = req.params.id;
        await accountSchema.find({ userId: id }, { accountId: 1, accountName: 1, _id: 0 })
            .then((doc) => {
                if (doc)
                    res.status(200).json(doc);
                else
                    res.status(200).json({});
            }).catch((err) => {
                res.sendStatus(404);
            });
    },
    // updateBalance: async (req, res) => {
    //     console.log(req.body)
    //     const balance = Number(req.body.balance) + Number(req.body.amount);
    //     await accountSchema.updateOne({ userId: req.body.userId, accountId: req.body.account }, { $set: { currentBalance: balance } })
    //         .then((doc) => {
    //             console.log('last', doc);
    //             res.status(200).json(req.body);

    //         }).catch((err) => {
    //             console.log('update');
    //             res.sendStatus(404);
    //         });
    // },
}


export default accountRoute;