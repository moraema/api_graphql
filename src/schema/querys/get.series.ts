import { Series } from "../../entities/series";

export const GetSeries = async(parent: any, _args: any, { user }: { user: any }) => {
   
    if (!user) {
        throw new Error('Usuario no autenticado')
    }

    try {
       const GetSeries = await Series.find();
       
       return GetSeries;

    } catch ( error ) {
        throw new Error('Hubo un error al abrir los comentarios');
    }
}