import { addKeyword } from '@builderbot/bot'
import continuar from '../validaciones/continuar.flow.js'
import hello from '../main.flow.js'

/**
 * Un flujo conversacion que es por defecto cunado no se contgiene palabras claves en otros flujos
 */
export default addKeyword(['preguntas', 'pre', 'pregunta'])
    .addAnswer(
        [
            '📄 Aqui podemos escalar tu preguntas',
            '\n*1* ¿Como hacer denuncias?',
            '\n*2* ¿Proceso de mi denuncia?',
            '\n*3* ¿Nuevas campañas?',
            '\n*4* ¿En que consiste las dinamicas?',
            '\n*5* ¿Como registrarme al portal?',
            '',
            '\n*6* Volver',
        ],
        { capture: true },
        async (ctx, { gotoFlow, fallBack, endFlow }) => {
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
                    return gotoFlow(continuar)
                case "6":
                    return gotoFlow(hello)
                default:
                    return fallBack(`❌ La opcion ${option} no es valida ❌`)
            }
        }
    )
   


