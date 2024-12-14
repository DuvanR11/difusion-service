import nodemailer from 'nodemailer'
import template from './emailTemplate'
import { config } from 'dotenv'
config()

const user = 'vitalsysinfo@gmail.com'
const pwd = 'decyaxujyempfotv'
const to = 'duriveramo@gamil.com '

export async function sendEmail(code: any) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: user,
                pass: pwd,
            },
        });
        const mailOptions = {
            from: user,
            to: to,
            subject: 'Paring Code',
            html: template(code),
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

// module.exports = {
//     sendEmail
// }