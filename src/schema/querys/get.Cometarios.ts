import { Comentarios } from "../../entities/comentarios";

export const GetComentario = async (parent: any, _args: any, { user }: { user: any }) => {
 
  if (!user) {
    throw new Error(' Usuario no autenticado.');
  }

  try {
    const GetComentario = await Comentarios.find();
    return GetComentario;
  } catch (error) {
    throw new Error("Hubo un error al abrir los comentarios" + error);
  }
};
