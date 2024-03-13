import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Webhooks } from "./webhook";

@Entity()
export class Eventos extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    nombre: string;
    
    @ManyToOne(() => Webhooks, webhook => webhook.eventos)
    webhook: Webhooks;
}