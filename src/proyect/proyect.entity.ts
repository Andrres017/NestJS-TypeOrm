import { Contract } from "src/contract/contract.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proyect{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false,unique: true})
    name: string

    @OneToMany(() => Contract, contract => contract.proyect)
    contracts: Contract[];
}