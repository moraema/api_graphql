
import { Series } from "../../entities/series";
import { Eventos } from "../../entities/evento";
import { notificarwebhook } from "../webhook/notifi";

export const createSeries = async (_: void, ars: any, { user }: { user: any }) => {

    if (!user) {
        throw new Error('Usuario no autenticado');
    }

    try {
        const { titulo, temporada, capitulos } = ars.series;

        const newSeries = await Series.create({ titulo, temporada, capitulos }).save();
        const series = JSON.stringify(newSeries);

        const evento = await Eventos.createQueryBuilder("eventos")
            .leftJoinAndSelect("eventos.webhook", "webhook")
            .where("eventos.nombre = :nombreEvento", { nombreEvento: 'CreateSeries' })
            .getOne();

        if (!evento) {
            throw new Error('Evento no encontrado');
        }

        const { nombre } = evento;
        const { url } = evento.webhook;
        await notificarwebhook(url, nombre, series);

        return newSeries;
    } catch (error) {
        throw new Error('Hubo un error al crear la series' + error)
    }
}