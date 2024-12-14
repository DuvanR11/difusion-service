import { addKeyword } from '@builderbot/bot'

const waitT = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ms)
        }, ms)
    })
}

export default addKeyword(['dinamica', 'dinamicas'])
    .addAnswer(
        [ 
            'Nuestra proxima dianmica sera *Control de seguridad*',
            'Te esperamos a las 4:00 PM no faltes',
            'Ubicación: ',
        ]
    )
    .addAction(
        async (ctx, { provider, flowDynamic }) => {
            await provider.vendor.sendPresenceUpdate('recording', ctx.key.remoteJid)
            await waitT(5000)
            await provider.vendor.sendPresenceUpdate('composing', ctx.key.remoteJid)
            await waitT(5000)

            const number = ctx.key.remoteJid
            await provider.vendor.sendMessage(
                number, {
                location: {
                    degreesLatitude: 45.685941,
                    degreesLongitude: -73.7386477,
                    name: "Evento Control",
                    address: "Localidad kennedy"
                }
            }
            )


            await flowDynamic('Great!')
        }
    )


