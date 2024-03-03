import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Users } from '../entities/user';
import dotenv from 'dotenv';

dotenv.config();

interface RequestWithUser extends Request {
  user?: any;
}

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export function generateToken(username: string): string {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
}

export async function authenticateJWT(req: RequestWithUser, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decodedToken: any = jwt.verify(token, JWT_SECRET);
      const user = await Users.findOne({  where : {username: decodedToken.username  }});

      if (user) {
        req.user = user;
      }
    } catch (error) {
    }
  }

  next();
}
