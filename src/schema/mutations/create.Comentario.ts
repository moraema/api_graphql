import { Comentarios } from "../../entities/comentarios";

export const createComentarios = async (_: void, args: any) => {
  try {
    const { comentarios, puntuacion } = args.comentario;

    const newComentario = await Comentarios.create({
      comentarios,
      puntuacion
    }).save();

    return newComentario;
  } catch (error) {
    throw new Error('Hubo un error al crear el comentario: ' + error);
  }
}
