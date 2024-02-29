import { Actores } from "../../entities/actores";

export const GetActor = async (_: any, { page = 1, pageSize = 10, order = 'ASC' }: { page?: number, pageSize?: number, order?: 'ASC' | 'DESC' }) => {
    try {
        const skip = (page - 1) * pageSize;

        const actors = await Actores.find({
            skip: skip,
            take: pageSize,
            order: {
                nombre: order 
            }
        });

        const totalCount = await Actores.count();
        const totalPages = Math.ceil(totalCount / pageSize);

        return {
            message: "Se obtuvieron los actores correctamente",
            data: actors,
            total: totalCount,
            totalPages,
            currentPage: page
        };
    } catch (error) {
        throw new Error('Hubo un error al obtener los actores');
    }
};
