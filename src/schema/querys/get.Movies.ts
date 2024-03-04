import { Movies } from "../../entities/movies"


export const GetMovies = async (_: any, { page = 1, pageSize = 10, order = 'ASC' }: { page?: number, pageSize?: number, order?: 'ASC' | 'DESC' }, { user }: { user: any }) => {


  if (!user) {
    throw new Error(' Usuario no autenticado.');
  }

    try {
      const skip = (page -1 ) * pageSize;


       const movies = await Movies.find({
         skip: skip,
         take: pageSize,
         order: {
            title: order
         }
       });

       const totalCount = await Movies.count();
       const totalPages = Math.ceil(totalCount / pageSize);

       return {
         message: "Se obtuvieron los peliculas correctamente",
         data : movies,
         total: totalCount,
         totalPages,
         currentPage: page
       };
    }
     catch (error) {
        throw new Error('Hubo un error al optener a las peliculas')
     };
    
}