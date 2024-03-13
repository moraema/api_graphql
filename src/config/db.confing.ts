import 'reflect-metadata';
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Users } from "../entities/user";
import { Movies } from '../entities/movies';
import { Actores } from '../entities/actores';
import { Comentarios } from '../entities/comentarios';
import { Series } from '../entities/series';
import { Eventos } from '../entities/evento';
import { Webhooks } from '../entities/webhook';


dotenv.config();

export const AppDataSource = new DataSource({
   type: 'mysql',
   username: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   port: 3306,
   host: process.env.DB_HOST,
   database: process.env.DATA_BASE,
   entities: [Users, Movies, Actores, Comentarios, Series, Webhooks, Eventos],
   synchronize: true,
})


