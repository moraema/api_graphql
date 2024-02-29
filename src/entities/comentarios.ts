import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comentarios extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comentarios: string;

    @Column()
    puntuacion: string
}