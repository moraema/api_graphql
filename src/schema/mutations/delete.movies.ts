import { Actores } from "../../entities/actores";
import { Movies } from "../../entities/movies";


export const deleteMovies = async (_: any, args: any) => {
    const { id } = args.movies;
    
    try {
        await Actores.delete( {pelicula:  {id: id}})
        const deleteMovies = await Movies.delete(id);

        if (!deleteMovies) {
            throw new Error('No se encotro la pelicula a eliminar');
        }

        return true;
    } catch ( error ){
        throw new Error('Hubo un error al eliminar la pelicula')
    }
}