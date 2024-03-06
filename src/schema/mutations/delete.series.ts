import { Series } from "../../entities/series";


export const deleteSeries = async(_: any, args: any, { user }: { user: any, webhookurl: any}) => {

    if (!user) {
         throw new Error('Usuario no autenticado');
    }

   const { id, webhookurl } = args.series;
   
   try {
    const deleteSerie = await Series.delete(id);

    if (!deleteSerie) {
        throw new Error('El actor no fue encontrado');
    }

    return { id };
   } catch ( error ) {
    throw new Error('Hubo un error al eliminar la serie: ' + error);
   }
}