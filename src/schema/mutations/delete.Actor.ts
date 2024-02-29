import { Actores } from "../../entities/actores";

export const deleteActor = async (_: any, args: any) => {

    const { id  } = args.input;
    try {
    const deleteActor = await Actores.delete(id);
   
    if (!deleteActor) {
        throw new Error('El actor no fue encontrado');
    } 
        return true;
    

   } catch ( error ) {
    throw new Error('Hubo un error al eliminar el actor: ' + error);
   }
}
