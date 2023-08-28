import { Contract } from "src/contract/contract.entity";
import { Column, ManyToOne, PrimaryColumn } from "typeorm";

export class Otrosi {
    //CE  Comprobante de egreso
    @PrimaryColumn()
    id: number

    @Column()
    numeroOtrosi: number

    @Column()
    concepto: string

    @Column()
    fecha: string

    @Column()
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