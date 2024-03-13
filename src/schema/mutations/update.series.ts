//Esto en update.series:

import { Series } from "../../entities/series";
import { Eventos } from "../../entities/evento";
import { notificarwebhook } from "../webhook/notifi";

export const updateSeries = async (_: any, args: { series: any }, { user }: { user: any }) => {

    if (!user) {
        throw new Error('Usuario no autenticado')
    }

    const { id, titulo, temporada, capitulos } = args.series

    try {
        const result = await Series.update({ id }, { titulo, temporada, capitulos });

        if (result.affected === 0) {
            throw new Error('La serie no fue encontrada');
        }
        const serie = JSON.stringify({ titulo, temporada, capitulos, id })
        const evento = await Eventos.createQueryBuilder("eventos")
            .leftJoinAndSelect("eventos.webhook", "webhook")
            .where("eventos.nombre = :nombreEvento", { nombreEvento: 'UpdateSeries' })
            .getOne();

        if (!evento) {
            throw new Error('Evento no encontrado');
        }

        const { nombre } = evento;
        const { url } = evento.webhook;

        await notificarwebhook(url, nombre, serie)
        return { titulo, temporada, capitulos, id };
    } catch (error) {
        throw new Error('hubo un error al actulizar la serie' + error)
    }
}