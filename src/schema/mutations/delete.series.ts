import { Series } from "../../entities/series";
import { notificarwebhook, EventType } from "../../webhook/webhook.notification";

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
    
    const serie = JSON.stringify({ id});
    await notificarwebhook(webhookurl, EventType.DeleteSeries, serie);
    return { id };
   } catch ( error ) {
    throw new Error('Hubo un error al eliminar la serie: ' + error);
   }
}