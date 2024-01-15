import expenseSchema from '../model/expense.js'
import incomeSchema from '../model/income.js'
import accountSchema from '../model/account.js'
import userSchema from '../model/user.js'

const expenseRoute = {
    create: async (req, res, next) => {
        const data = new expenseSchema(req.body);
        let newData, balance, updated, account;
        try {
            newData = await data.save();

            balance = await accountSchema.findOne({ userId: newData.userId, accountId: newData.account }, { accountId: 1, currentBalance: 1, _id: 0 });
            // balance.currentBalance -= newData.amount; 

            updated = await accountSchema.updateOne({ userId: newData.userId, accountId: newData.account }, { $set: { currentBalance: balance.currentBalance - newData.amount } });

            account = await userSchema.findOne({ userId: newData.sentTo });

            // new incomeSchema({ 
            //     userId:newData.sentTo,
            //     account:account.defaultAccount,
            //     category: 'IC1',
            //     amount : newData.amount,
            //     receivedFrom: newData.userId,
            //     description: newData.description,
            //     title: newData.title,
            //     transactionDate: newData.transactionDate
            // }).save();

            // balance = await accountSchema.findOne({ userId: newData.sentTo, accountId: account.defaultAccount }, { accountId: 1, currentBalance: 1, _id: 0 });
            // // balance.currentBalance += newData.amount; 

            // updated = await accountSchema.updateOne({ userId: newData.sentTo, accountId: account.defaultAccount }, { $set: { currentBalance: +balance.currentBalance + +newData.amount } });

            // res.status(201).json(newData);

            if (req.body.sentTo) {
                req.body = {
                    userId: newData.sentTo,
                    account: account.defaultAccount,
                    category: 'IC0',
                    amount: newData.amount,
                    receivedFrom: newData.userId,
                    description: newData.description,
                    title: newData.title,
                    transactionDate: newData.transactionDate
                }
                next();
            } else {
                res.status(201).json(newData);
            }


        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    getByDate: async (req, res) => {
        let date = new Date()
        date.setUTCHours(0, 0, 0, 0)
        date.setDate(new Date().getDate() + (req.body.counter))
        await expenseSchema.aggregate([
            {
                $match: {
                    userId: req.body.userId,
                    transactionDate: {
                        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
                    }
                }
            },
            {
                $lookup: {
                    from: 'expensecategories',
                    localField: 'category',
                    foreignField: 'categoryID',
                    as: 'catData'
                }
            },
            {
                $unwind: '$catData'
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    amount: 1,
                    account: 1,
                    sentTo: 1,
                    category: '$catData.iconURL'
                }
            },
            {
                $sort: {
                    transactionDate: 1
                }
            }
        ])
            .then((doc) => {
                res.status(200).json(doc)
            }).catch((err) => {
                console.log(err)
            })
    },
    total: async (req, res) => {
        let date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        date.setDate(new Date().getDate() + (req.body.counter));
        expenseSchema.aggregate([
            {
                $match: {
                    userId: req.body.userId,
                    transactionDate: {
                        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
                    }
                }
            },
            {
                $group: {
                    _id: '$userID',
                    inTotal: { $sum: '$amount' }
                }
            },
            {
                $project: {
                    inTotal: 1,
                    _id: 0
                }
            }
        ]).then((doc) => {
            res.status(200).json(doc);
        }).catch((err) => {
            res.status(404).json({});
        })
    },
    monthlyData: async (req, res) => {
        let data = {};
        expenseSchema.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ["$userId", req.body.userId] },
                            { $eq: [{ $month: "$transactionDate" }, req.body.month] },
                            { $eq: [{ $year: "$transactionDate" }, req.body.year] }
                        ]
                    }
                }
            },
            {
                $sort: {
                    transactionDate: 1
                }
            },
            {
                $project: {
                    title: 1,
                    amount: 1,
                    transactionDate: 1,
                    dayOfYear: { $dayOfYear: "$transactionDate" },
                    _id: 1
                }
            }
        ]).then((doc) => {
            doc.forEach(ele => {
                if (data[ele.dayOfYear]) {
                    data[ele.dayOfYear].push(ele)
                } else {
                    data[ele.dayOfYear] = [ele]
                }
            })
            res.status(200).json(data);
        }).catch((err) => {
            console.log(err)
            res.sendStatus(500);
        })
    },
    monthlyTotal: async (req, res) => {
        expenseSchema.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ["$userId", req.body.userId] },
                            { $eq: [{ $month: "$transactionDate" }, req.body.month] },
                            { $eq: [{ $year: "$transactionDate" }, req.body.year] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: '$userId',
                    total: { $sum: '$amount' }
                }
            },
            {
                $project: {
                    total: 1,
                    _id: 0
                }
            }
        ]).then((doc) => {
            res.status(200).json(doc);
        }).catch((err) => {
            console.log(err)
            res.status(200).json({});
        })
    },
    yearlyData: async (req, res) => {
        let data = {};
        expenseSchema.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ["$userId", req.body.userId] },
                            { $eq: [{ $year: "$transactionDate" }, req.body.year] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$transactionDate" },
                    sum: { $sum: '$amount' }
                }
            },
        ]).then((doc) => {
            doc.forEach((ele) => {
                data[ele._id] = ele.sum;
            })
            res.status(200).json(data);
        }).catch((err) => {
            console.log(err)
            res.sendStatus(500);
        })
    },
    yearlyTotal: async (req, res) => {
        expenseSchema.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ["$userId", req.body.userId] },
                            { $eq: [{ $year: "$transactionDate" }, req.body.year] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: '$userId',
                    total: { $sum: '$amount' }
                }
            },
            {
                $project: {
                    total: 1,
                    _id: 0
                }
            }
        ]).then((doc) => {
            res.status(200).json(doc);
        }).catch((err) => {
            console.log(err)
            res.status(200).json({});
        })
    },
    monthlyCharts: async (req, res) => {
        expenseSchema.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ["$userId", req.body.userId] },
                            { $eq: [{ $month: "$transactionDate" }, req.body.month] },
                            { $eq: [{ $year: "$transactionDate" }, req.body.year] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' }
                }
            },
            {
                $lookup: {
                    from: 'expensecategories',
                    localField: '_id',
                    foreignField: 'categoryID',
                    pipeline: [
                        {
                            $project: {
                                categoryName: 1,
                                iconURL: 1,
                                iconColor: 1,
                                _id: 0
                            }
                        }
                    ],
                    as: 'data'
                }
            },
            {
                $unwind: '$data'
            },
            {
                $project: {
                    _id: 1,
                    title: '$data.categoryName',
                    value: '$total',
                    iconURL: '$data.iconURL',
                    iconColor: '$data.iconColor'
                }
            }
        ]).then((doc) => {
            res.status(200).json(doc);
        }).catch((err) => {
            console.log(err)
            res.status(200).json({});
        })
    },
    yearlyCharts: async (req, res) => {
        expenseSchema.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ["$userId", req.body.userId] },
                            { $eq: [{ $year: "$transactionDate" }, req.body.year] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' }
                }
            },
            {
                $lookup: {
                    from: 'expensecategories',
                    localField: '_id',
                    foreignField: 'categoryID',
                    pipeline: [
                        {
                            $project: {
                                categoryName: 1,
                                iconURL: 1,
                                iconColor: 1,
                                _id: 0
                            }
                        }
                    ],
                    as: 'data'
                }
            },
            {
                $unwind: '$data'
            },
            {
                $project: {
                    _id: 1,
                    title: '$data.categoryName',
                    value: '$total',
                    iconURL: '$data.iconURL',
                    iconColor: '$data.iconColor'
                }
            }
        ]).then((doc) => {
            res.status(200).json(doc);
        }).catch((err) => {
            console.log(err)
            res.status(200).json({});
        })
    },
}


export default expenseRoute;