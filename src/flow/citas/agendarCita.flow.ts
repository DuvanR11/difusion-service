import { addKeyword } from '@builderbot/bot'
import { isEmail } from '~/utils/validations';

export default addKeyword(['Agendar'])
    .addAnswer('¿Cuál es tu nombre?', { capture: true }, async (ctx, { state }) => {
        await state.update({ name: ctx.body }); 
    })
    .addAnswer('¿Cuál es tu correo?', 
    { capture: true }, 
    async (ctx, { state, fallBack  }) => {
        if ( isEmail(ctx.body) ) {
            await state.update({ email: ctx.body });  
        } else {
            return fallBack('Ingresa un correo valido ❌')
        }
    })
    .addAnswer('Tus datos son:', null, async (_, { flowDynamic, state }) => {
        const nombre = state.get('name');
        const email = state.get('email');
        await flowDynamic(`Nombre: ${nombre} correo: ${email}`);
    });


   