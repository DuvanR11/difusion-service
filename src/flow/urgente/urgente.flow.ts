import { addKeyword } from '@builderbot/bot'

export default addKeyword(['urgente', 'urge'])
    .addAnswer(
        [
            'Cuentanos tu problema queremos', 
            'apoyarte y escalaremos tu caso'
        ],
        null, 
        null
    )
    .addAnswer('Generando caso....', null, null)
    .addAnswer(
        [
            'Necesitaremos estos datos',
            '👉 *Correo* Dejanos tus dudas',
        ],
        {capture:true}, 
        async(ctx, {state, fallBack}) => {
        
            if(!ctx.body.includes('@')){
                return fallBack('Por favor ingresa un correo valido')
            }
            await state.update({email:ctx.body.toLowerCase()})
        },
    )
    .addAnswer('Apartir de este momento tu caso quedo registrado', null, null)

