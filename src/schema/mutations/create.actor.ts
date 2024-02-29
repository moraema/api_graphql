import { Actores } from "../../entities/actores";


export const createActor = async (_: void, args: any) => {
    try {
        const { nombre, apellido,  pelicula} = args.actores;

        const newActor = await Actores.create({ nombre, apellido,  pelicula}).save();
        return newActor
    } catch ( error) {
        throw new Error('Hubo un error al crear al actor'+ error)
    }
}