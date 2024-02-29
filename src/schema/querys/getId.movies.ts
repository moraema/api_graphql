import { Movies } from "../../entities/movies";

export const GetIdMovies = async(_: any, args: any) => {
    const { id } = args;

    try {
        const moviesId = await Movies.findOne({ where: { id } });
        return moviesId;
    } catch (error) {
        throw new Error('Hubo un error al obtener la película buscada: ' + error);
    }
};
