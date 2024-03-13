
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Eventos } from "./evento";

@Entity()
export class Webhooks extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @OneToMany(() => Eventos, evento => evento.webhook)
    eventos: Eventos[];
}



