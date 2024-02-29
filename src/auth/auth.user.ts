import { Users } from '../entities/user'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const jwtSecret = 'hola-mundo';

export async function loginUser(_: any, args: any) {
  const { username, password } = args;
  try {
    
    const userEncontrado = await Users.findOne({ where: { username } });

    if (!userEncontrado) {
      return { message: 'Usuario o contraseña incorrecto' };
    }

    if (typeof password !== 'string' || typeof userEncontrado.password !== 'string') {
      return { message: 'Usuario o contraseña incorrecto' };
    }

   
    const passwordEncontrado = await bcrypt.compare(password, userEncontrado.password);

    if (!passwordEncontrado) {
      return { message: 'Usuario o contraseña incorrectos' };
    }

   
    const payload = {
      user: userEncontrado.id,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    return { message: 'Acceso correcto', token };
  } catch (error) {

    throw new Error('Hubo un error al iniciar sesión: ' + error);
  }
}
