import { Contract } from "src/contract/contract.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Otrosi {
    //CE  Comprobante de egreso
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    numeroOtrosi: string

    @Column()
    concepto: string

    @Column()
    fecha: Date

    @Column({default:'0'})
    valorTotal: string

    @Column({
        nullable: false,
        type: "enum",
        enum: ['Positivo', 'Negativo']
    })
    accion: string

    @ManyToOne(() => Contract, contract => contract.otrosi)
    contract: Contract;
}