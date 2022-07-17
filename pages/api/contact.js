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
                // tls: {
                //     ciphers:'SSLv3'
                // }
            })


            console.log(process.env.SMTP_HOST, process.env.SMTP_USER, process.env.SMTP_PASSWORD)

            const mailData = {
                from: {
                    name: req.body.email,
                    address: 'info@juedische-stimme.com'
                },
                replyTo:req.body.email,
                to: 'info@juedische-stimme.com',
                subject: `Contact Message From ${req.body.name}`,
                text: req.body.message,
                html: `<div>${req.body.message}</div>`
            }

            transporter.sendMail(mailData, function (err, info) {
                console.log("HELLO")
                if(err){
                    console.log(err, " ERR!")
                    res.json({type:'error',error:err})
                }
                else {
                    console.log(info, " INFO!")
                    res.json({type:'success',info:info})
                }
            })

            // res.json({message:'email sent!'})
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