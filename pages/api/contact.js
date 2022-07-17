import excuteQuery from 'lib/db'
import { selectNavItems } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === "POST"){
            
            let nodemailer = require('nodemailer')
            const transporter = nodemailer.createTransport({
                port: 465,
                host: process.env.SMTP_HOST,
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASSWORD,
                },
                secure: true,
            })

            const mailData = {
                from: 'info@juedische-stimme.com',
                to: 'dnelband@gmail.com',
                subject: `Message From ${req.body.name}`,
                text: req.body.message,
                html: <div>{req.body.message}</div>
            }

            transporter.sendMail(mailData, function (err, info) {
                if(err){
                    console.log(err)
                    res.json({type:'error',error:err})
                }
                else {
                    console.log(info)
                    res.json({type:'success',info:info})
                }
            })

            console.log(req.body)
            // console.log(result)
            // res.json(result)
        } else {
            res.json({message:'NO GET HERE!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};