import { Comentarios } from "../../entities/comentarios";

export const createComentarios = async (_: void, args: any, { user }: { user: any }) => {
 
  if (!user) {
    throw new Error(' Usuario no autenticado.');
  }

  try {
    const { comentarios, puntuacion } = args.comentario;

    const newComentario = await Comentarios.create({
      comentarios,
      puntuacion
    }).save();

    return { puntuacion, comentarios};
  } catch (error) {
    throw new Error('Hubo un error al crear el comentario: ' + error);
  }
}
