import { Series } from "../../entities/series";
import { Eventos } from "../../entities/evento";
import { notificarwebhook } from "../webhook/notifi";

export const deleteSeries = async (_: any, args: any, { user }: { user: any }) => {

    if (!user) {
        throw new Error('Usuario no autenticado');
    }

    const { id } = args.series;

    try {
        const deleteSerie = await Series.delete(id);

        if (!deleteSerie) {
            throw new Error('El actor no fue encontrado');
        }
        const serie = JSON.stringify({ id });

        const evento = await Eventos.createQueryBuilder("eventos")
            .leftJoinAndSelect("eventos.webhook", "webhook")
            .where("eventos.nombre = :nombreEvento", { nombreEvento: 'DeleteSeries' })
            .getOne();

        if (!evento) {
            throw new Error('Evento no encontrado');
        }

        const { nombre } = evento;
        const { url } = evento.webhook;

        await notificarwebhook(url, nombre, serie);
        return { id };
    } catch (error) {
        throw new Error('Hubo un error al eliminar la serie: ' + error);
    }
}