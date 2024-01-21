import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'

const otpRoute = {
    sendOTP: async (req, res) => {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'u22cs035@coed.svnit.ac.in',
                pass: 'wawwlyyywuqnjktx'
            }
        });
        const otp = Math.floor(Math.random()*1000000)
        const info = await transporter.sendMail({
            from: '"Devesh Mehta" <u22cs035@coed.svnit.ac.in>',
            to: req.body.email,
            subject: "Thank you for registering.",
            text: "Your OTP is "+otp,
            html: "Your OTP is <b>"+otp+"</b>.<br>-Devesh Mehta",
        }).then((doc)=>{
            res.status(200).json({'otp':bcrypt.hashSync(otp.toString(),Number(process.env.SALT_ROUND))});
        }).catch((err)=>{
            console.log(err)
            res.sendStatus(404);
        });
    }
}

export default otpRoute;