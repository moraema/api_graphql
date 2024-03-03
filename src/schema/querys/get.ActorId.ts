import { Actores } from "../../entities/actores";



export const GetActorId = async(_: any, args: any,  { user }: { user: any }) => {
   
    if (!user) {
        throw new Error(' Usuario no autenticado.');
      }
   
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