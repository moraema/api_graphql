/*import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = 'holamundo';

interface AuthenticatedRequest extends Request {
    user?: any; 
}

export const verificarJwt = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token de autorización no proporcionado' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = decoded; 
        next();
    });
};*/

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const jwtSecret = 'claveSecreta';

interface AuthenticatedRequest extends Request {
    user?: JwtPayload; 
}

export const verificarJwt = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Obtener el token de autorización del encabezado
    const token = req.headers['authorization'];

    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ message: 'Token de autorización no proporcionado' });
    }

    // Verificar el token JWT
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Si el token es válido, adjuntar los datos del usuario decodificados a la solicitud
        req.user = decoded as JwtPayload;
        next();
    }); // Aquí se corrigió el cierre del callback de la función verify
};
