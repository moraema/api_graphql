import { Comentarios } from "../../entities/comentarios";
import { verifyToken } from "../../utils/jwt/verify.jwt";

export const GetComentario = async (parent: any, _args: any, context: any,) => {
    
    const token = context.token;
    console.log(token)
    const user = await verifyToken(token);
    if (!user) {
      throw new Error("User is not Authenticated");
    }
  try {
    const GetComentario = await Comentarios.find();
    return GetComentario;
  } catch (error) {
    throw new Error("Hubo un error al abrir los comentarios");
  }
};
