import { Series } from "../../entities/series";


export const updateSeries = async(_: any, args : { series: any}, { user }: { user: any, webhookurl: any}) => {

    if (!user) {
        throw new Error('Usuario no autenticado')
    }

    const {id, titulo, temporada, capitulos, webhookurl} = args.series

    try {
        const result = await Series.update({ id }, {titulo, temporada, capitulos});

        if (result.affected === 0) {
            throw new Error('La serie no fue encontrada');
        }

        return { titulo, temporada, capitulos, id};
    } catch (error ) {
        throw new Error('hubo un error al actulizar la serie' + error)
    }
}
