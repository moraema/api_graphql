import { Users } from '../entities/user'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET } from '../constants/secret.jwt';

export async function loginUser(_: any, args: any) {
  const { username, password } = args;
  try {
    // Buscar el usuario por nombre de usuario
    const userEncontrado = await Users.findOne({ where: { username } });

    if (!userEncontrado) {
      return { message: 'Usuario o contraseña incorrecto' };
    }

    // Verificar la contraseña
    const passwordEncontrado = await bcrypt.compare(password, userEncontrado.password);

    if (!passwordEncontrado) {
      return { message: 'Usuario o contraseña incorrectos' };
    }

    // Generar el token JWT con el ID y el nombre de usuario como payload
    const token = jwt.sign({ _id: userEncontrado.id.toString(), name: userEncontrado.username }, SECRET, { expiresIn: '1h' });

    return { message: 'Acceso correcto', token };
  } catch (error) {
    throw new Error('Hubo un error al iniciar sesión: ' + error);
  }
}
