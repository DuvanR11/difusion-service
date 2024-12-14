import { addKeyword } from '@builderbot/bot'

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default addKeyword(['asesor', 'ase'])
    .addAnswer(
        [
            'Quieres que se contacten a este numero?',
            '👉 *Si*',
            '👉 *No*',
        ],
        {capture:true}, 
        async(ctx, {state, fallBack}) => {
        
            if(ctx.body.includes('Si')){
                return fallBack('En unos minutos te contactaremos')
            } else if (!ctx.body.includes('No')) {
                return fallBack('Dejanos el numero')
            }
        },
    )
    .addAnswer('Gracias por utilizar los servisio', null, null)

