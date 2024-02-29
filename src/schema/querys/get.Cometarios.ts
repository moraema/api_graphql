import { Comentarios } from "../../entities/comentarios"

export const GetComentario = async () =>{

    try {
        const GetComentario = await Comentarios.find();
        return GetComentario;
    } catch( error ) {
        throw new Error('Hubo un error al opener los comentarios')
    }
}