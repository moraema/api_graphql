import { Request } from 'express';
import { verifyToken } from '../utils/jwt/verify.jwt';
import { Users } from '../entities/user';

async function createApolloGraphqlServer({ req }: { req: Request }) {
  // Extraer el token del encabezado de autorización
  try {
  const token = req.headers.authorization?.split(' ')[1] || '';
  

    const user: Users | null = await verifyToken(token);
    console.log('user', user);
    return { user };
  } catch (error) {

    console.error('Error verifying token:', error);
    return { user: null };
  }
}

export default createApolloGraphqlServer;
