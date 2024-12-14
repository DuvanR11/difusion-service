import { createBot, createProvider, MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import adapterFlow from './flow'

import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

import { v2 as cloudinary } from 'cloudinary'
import { addRandomEmoji } from './utils/emojis';

// import { sendEmail } from 'utils/email/sendMail';

const PHONE_NUMBER ='573204084584'
// const PHONE_NUMBER ='573102782407'
const PORT = process.env.PORT ?? 3008

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const main = async () => {
    
    const adapterProvider = createProvider(Provider, { usePairingCode: true, phoneNumber: PHONE_NUMBER })
    const adapterDB = new Database()

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    
    // adapterProvider.on("require_action", async (payload) => {
    //     sendEmail(payload.instructions[1].split(" ").pop())
    //     console.log(payload.instructions[1].split(" ").pop());
    //   });


    const storage = multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = path.extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        }
      });

    const upload = multer({ storage });

    // Endpoint para subir el archivo CSV
    adapterProvider.server.post('/upload', upload.single('csvFile'), async (req: any, res) => {

        if (!req.file) {
            res.end('No se ha subido ningún archivo');
        }

        const { message, urlMedia } = req.body

        const results: any[] = [];
       
        fs.createReadStream(req.file.path)
            .pipe(csvParser({ separator: ';' }))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (let i = 0; i < results.length; i++) {
                    const row = results[i];
                    const { nombre, telefono } = row;

                    try {
                        const response = await axios.post('http://localhost:8080/v1/messages', {
                            number: '57' + telefono,
                            message: addRandomEmoji(message.replace('{nombre}', nombre)),
                            urlMedia
                        });
                        console.log(i + 1, 'Mensaje enviado:', response.data);

                        // Esperar 1 minuto antes de la próxima petición (excepto en la última iteración)
                        if (i < results.length - 1) {
                            await new Promise(resolve => setTimeout(resolve, 7000)); // 60000 milisegundos = 1 minuto
                        }
                    } catch (error) {
                        console.error('Error al llamar al otro endpoint:', error);
                    }
                }
                res.end('Mensajes enviados correctamente');
            });

    });
    

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body
            await bot.sendMessage(number, message, { media: urlMedia ?? null })
            return res.end('sended')
        })
    )

    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('REGISTER_FLOW', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('SAMPLES', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body
            if (intent === 'remove') bot.blacklist.remove(number)
            if (intent === 'add') bot.blacklist.add(number)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ status: 'ok', number, intent }))
        })
    )

    httpServer(+PORT)
}

main()
