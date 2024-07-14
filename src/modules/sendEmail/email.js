import nodemailer from 'nodemailer'
import { emailDesign } from './emailhtml.js';
import jwt from 'jsonwebtoken'

export const sendEmail=async(email)=>{
    const transporter = nodemailer.createTransport({
    

        service:"gmail",
        auth: {
          user: "ranalove171190@gmail.com",
          pass: "cmscmansgppmushg",
        }
      })
      jwt.sign({email},'simooz',async(err,token)=>{
        const info = await transporter.sendMail({
            from: '"stiky note app🥰" <ranalove171190@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: emailDesign(token), // html body
          })
          console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      })

      
}


