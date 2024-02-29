import { Movies } from "../../entities/movies";

export const updateMovies = async (_: any, args: { movies: any }) => {
    const { id, title, descripcion, vistas } = args.movies;
    try {
        
        const result = await Movies.update({ id }, { title, descripcion, vistas });

       
        if (result.affected === 0) {
            throw new Error('La película no fue encontrada');
        }

        return  true;
    } catch (error) {
        throw new Error('Hubo un error al actualizar la película: ' + error);
    }
}
