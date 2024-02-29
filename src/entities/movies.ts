import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Actores } from "./actores";

@Entity()
export class Movies extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    vistas: string;

    @Column()
    descripcion: string;

    @Column()
    categoria: string;

    @OneToMany(() => Actores, actor => actor.pelicula)
    actores: Actores[];
}
