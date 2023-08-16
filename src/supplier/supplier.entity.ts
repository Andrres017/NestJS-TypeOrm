import { Contract } from "src/contract/contract.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Suppllier{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    fullName: string

    @Column({ nullable: false,unique: true })
    document: string

    @Column({
        nullable: false,
        type: "enum",
        enum: ['CC', 'NIT']
    })
    documentType: string

    @OneToMany(() => Contract, contract => contract.supplier)
    contracts: Contract[];
}