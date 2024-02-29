import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Movies } from "./movies";

@Entity()
export class Actores extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @ManyToOne(() => Movies, movie => movie.actores)
    pelicula: Movies;
}
