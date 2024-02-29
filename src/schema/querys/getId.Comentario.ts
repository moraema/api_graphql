import { Comentarios } from "../../entities/comentarios";


export const GetComentarioId = async(_: void, args: any) => {
    const { id } = args;

    try {
        const getComentarioId = await Comentarios.findOne({ where: { id }});
        return getComentarioId;
    } catch( error) {
        throw new Error('Hubo un error al obtener el cometario')
    }
}