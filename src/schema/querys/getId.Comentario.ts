import { Comentarios } from "../../entities/comentarios";

export const GetComentarioId = async(_: void, args: any,  { user }: { user: any }) => {

    if (!user) {
        throw new Error(' Usuario no autenticado.');
      }
    const { id } = args;

    try {
        const getComentarioId = await Comentarios.findOne({ where: { id }});
        return getComentarioId;
    } catch( error) {
        throw new Error('Hubo un error al obtener el cometario')
    }
}