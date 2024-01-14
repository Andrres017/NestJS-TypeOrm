import { Contract } from "src/contract/contract.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movimientos {
    //CE  Comprobante de egreso
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    TipoDocumento: string

    @Column()
    numeroCe: number

    @Column()
    fecha: Date

    @Column({type: 'float'})
    valorAPagar: number

    @Column({type: 'float'})
    valorReteFit: number

    @Column({type: 'float'})
    valorReteGarantia: number

    @Column({
        nullable: false,
        type: "enum",
        enum: ['Contrato.', 'Rete fic.', 'Rete garantia.']
    })
    concepto: string

    @ManyToOne(() => Contract, contract => contract.movimiento)
    contract: Contract;
}