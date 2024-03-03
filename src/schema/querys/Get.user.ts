import { Users } from "../../entities/user";


export const GetUser = async (_: any, { page = 1, pageSize = 10, order = 'ASC' }: { page?: number, pageSize?: number, order?: 'ASC' | 'DESC' }, { user }: { user: any }) => {


    if (!user) {
        throw new Error(' Usuario no autenticado.');
      }

      
    try {

        const skip = ( page -1 ) * pageSize;

        const user = await Users.find({
            skip: skip,
            take: pageSize,
            order: {
                id: order
            }
        });

        const totalCount = await Users.count();
        const totalPages = Math.ceil(totalCount / pageSize);
    
        return {
        message: "Se obtuvieron los actores correctamente",
         data : user,
         total: totalCount,
         totalPages,
         currentPage: page
        };
    } catch ( error ) {
        throw new Error('Hubo un error al optener a los usuarios')
    }
}