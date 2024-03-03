import { Actores } from "../../entities/actores";

export const deleteActor = async (_: any, args: any,{ user }: { user: any } ) => {


    if (!user) {
        throw new Error(' Usuario no autenticado.');
      } 
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
