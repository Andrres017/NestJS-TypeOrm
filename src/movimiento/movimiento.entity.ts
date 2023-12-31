import { Contract } from "src/contract/contract.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movimientos {
    //CE  Comprobante de egreso
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    numeroCe: number

    @Column()
    concepto: string

    @Column()
    fecha: string

    @Column()
    valorTotal: string

    @Column()
    valorReteFit: string

    @Column({
        nullable: false,
        type: "enum",
        enum: ['Positivo', 'Negativo']
    })
    accionReteFit: string

    @Column()
    valorReteGarantia: string

    @Column({
        nullable: false,
        type: "enum",
        enum: ['Positivo', 'Negativo']
    })
    accionRetegarantia: string

    @ManyToOne(() => Contract, contract => contract.movimiento)
    contract: Contract;
}