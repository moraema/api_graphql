import { Actores } from "../../entities/actores";
import { sendNotification } from "./notification.Wehook";

export const createActor = async (_: void, args: any) => {
    try {
        const { nombre, apellido,  pelicula} = args.actores;

        const newActor = await Actores.create({ nombre, apellido,  pelicula}).save();

        await sendNotification(newActor);
        return newActor
    } catch ( error) {
        throw new Error('Hubo un error al crear al actor'+ error)
    }
}