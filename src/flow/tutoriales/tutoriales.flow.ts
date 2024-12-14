import { addKeyword } from '@builderbot/bot'
import continuar from '../validaciones/continuar.flow.js'
import hello from '../main.flow.js'


export default addKeyword(['tutoriales', 'tuto'])
    .addAnswer(
        [
            '🧑🏽‍🏫 Contamos con difrentes tutoriales',
            '📄 los cauales te ayudaran a realizar cada de uno de los apoyos que ofrecemos',
        ],
    )
    .addAnswer(
        [
            '📄 Aqui podemos escalar tu preguntas',
            '\n*1* ¿Como subir una denuncia?',
            '\n*2* ¿Como gestionar apoyo?',
            '\n*3* ¿Como generar una cita?',
            '\n*4* ¿Como ver el proceso de mi cita?',
            '',
            '\n*5* Volver',
        ],
        { capture: true },
        async (ctx, { provider, gotoFlow, fallBack, endFlow }) => {
            await provider.sendFile(ctx.key.remoteJid, './src/assets/PROPUESTA_CHATBOT.pdf')
            await provider.sendImage(ctx.key.remoteJid, `https://static.vecteezy.com/system/resources/previews/003/805/406/non_2x/online-tutorial-concept-learning-courses-tutorials-illustration-flat-vector.jpg`, 'Nuestro compromiso es contigo')
            const option = ctx.body
            switch (option) {
                case "1":
                    return gotoFlow(continuar)
                case "2":
                    return gotoFlow(continuar)
                case "3":
                    return gotoFlow(continuar)
                case "4":
                    return gotoFlow(continuar)
                case "5":
                    return gotoFlow(hello)
                default:
                    return fallBack(`❌ La opcion ${option} no es valida ❌`)
            }
        }
    )
