import { Users } from "../../entities/user";
import bcrypt from 'bcrypt';


const saltRounds = 10;

export const createUser = async (_: void, args: any) => {
    try {
        const { username, password } = args.user;

        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const newUser = await Users.create({ username, password: hashedPassword }).save();


        return { username, password };
        
    } catch (error) {
        throw new Error('Hubo un error al crear el usuario: ' + error);
    }
};
