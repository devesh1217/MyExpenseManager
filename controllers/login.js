import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import userSchema from '../model/user.js'

const loginRoute = {
    validate: async (req, res) => {
        const id = req.body.id;
        const pswd = req.body.password;
        await userSchema.findOne({ userId: id }, { userId: 1, password:1, _id: 0 })
            .then((doc) => {
                if (bcrypt.compare(pswd,doc.password)) {
                    try {
                        var token = jwt.sign(
                            { userId: id, exp: Math.floor(Date.now() / 1000) + (3600*24*30), },
                            process.env.PRIVATE_KEY
                        );
                        res.status(201).json({ token,isValid: true });
                    } catch(err) {
                        console.log(err)
                        res.sendStatus(500);
                    }
                } else {
                    res.status(200).json({ isValid: false })
                }
            }).catch((err) => {
                console.log(err)
                res.status(500).send('Error Occuered')
            });
    }
}


export default loginRoute;