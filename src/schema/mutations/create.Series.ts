import { Series } from "../../entities/series";



export const createSeries = async (_: void, ars: any, { user }: { user: any}) => {

    if (!user) {
        throw new Error('Usuario no autenticado');
    }

    try {
        const { titulo, temporada, capitulos } = ars.series;

        const newSeries = await Series.create({ titulo, temporada, capitulos}).save();
        
        return newSeries;
    } catch ( error ){ 
        throw new Error('Hubo un error al crear la series' + error)
    }
}