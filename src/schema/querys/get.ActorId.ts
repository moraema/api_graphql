import { Actores } from "../../entities/actores";



export const GetActorId = async(_: any, args: any) => {
    const { id } = args;

    try {

        const GetActor = await Actores.findOne({
            where: { id }
        });
        return GetActor;
    } catch ( error) {
        throw new Error('Hubo un error al optener al actor')
    }
}