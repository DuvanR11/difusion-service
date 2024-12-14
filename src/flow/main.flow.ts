import { EVENTS, addKeyword, MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

import preguntasFlow from './preguntas/preguntas.flow';
import urgenteFlow from './urgente/urgente.flow';
import asesorFlow from './asesor/asesor.flow';
import tutorialesFlow from './tutoriales/tutoriales.flow';
import dinamicasFlow from './dinamicas/dinamicas.flow'
import agendarCitaFlow from './citas/agendarCita.flow';
import { waitT } from '~/utils';


export default addKeyword<Provider, Database>(EVENTS.WELCOME)
    .addAnswer(
        [ 
            'Un gusto tenerte de nuevo',
            '\n¿Como puedo ayudarte el día de hoy 😀?'
        ],
        null,
        async (ctx, { provider }) => {
            await provider.vendor.sendPresenceUpdate('recording', ctx.key.remoteJid)
            await waitT(5000)
            await provider.vendor.sendPresenceUpdate('composing', ctx.key.remoteJid)
            await waitT(5000)
        },
    )
    .addAnswer(
        [
            'Tenemos unas secciones de tu interes',
            '👉 *Preguntas* Dejanos tus dudas',
            '👉 *Urgente*  Escalamos tu urgencia',
            '👉 *Asesor* Contactar un asesor',
            '👉 *Agendar* Agenda tu cita',
            '👉 *Tutoriales* Videos intructivos',
            '👉 *Dinamicas* Proximas dinamicas',
        ],
        null,
        null,
        [ 
            preguntasFlow,
            urgenteFlow,
            asesorFlow,
            agendarCitaFlow,
            tutorialesFlow,
            dinamicasFlow
        ]
    )

