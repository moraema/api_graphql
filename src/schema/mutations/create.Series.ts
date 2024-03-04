import { Series } from "../../entities/series";
import { notificarwebhook, EventType } from "../../webhook/webhook.notification";

export const createSeries = async (_: void, ars: any, { user }: { user: any, webhookurl : any}) => {

    if (!user) {
        throw new Error('Usuario no autenticado');
    }

    try {
        const { titulo, temporada, capitulos, webhookurl } = ars.series;

        const newSeries = await Series.create({ titulo, temporada, capitulos}).save();
        const series = JSON.stringify(newSeries);
        await notificarwebhook(webhookurl, EventType.CreateSeries, series);
        
        return newSeries;
    } catch ( error ){ 
        throw new Error('Hubo un error al crear la series' + error)
    }
}