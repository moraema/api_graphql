import { Movies } from "../../entities/movies";
import { publishMovieSave } from "../subscritions/movies.subscrition";
import { verify } from "jsonwebtoken";

export const createMovies = async (_:void, args: any, { user }: { user: any }) => {
    if (!user) {
        throw new Error(' Usuario no autenticado.');
      }
    try {
          const { title, descripcion, categoria, vistas } = args.movies;

        const newMovies = await Movies.create({ title, descripcion, categoria, vistas}).save();
        publishMovieSave(newMovies)
        return newMovies;
    } catch ( error ) {
        throw new Error(' Hubo un error al crear a la pelicula' + error)
    }
}
