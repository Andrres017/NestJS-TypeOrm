import { Proyect } from "src/proyect/proyect.entity";
import { Suppllier } from "src/supplier/supplier.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contract{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    numberContract: string

    @Column({ type: "date", nullable: false})
    dateStart: Date

    @Column({ type: "date", nullable: false})
    dateFinish: Date

    @Column({nullable: true})
    poliza: string

    @Column({
        nullable: false,
        type: "enum",
        enum: ['Todo costo', 'Servicios', 'Mano de obra', 'Compra']
    })
    contractType: string

    @Column({nullable: false})
    reteGarantia: string

    @Column({nullable: false})
    reteFit: string

    @Column({nullable: false})
    contractValueTotal: string

    @Column({nullable: false})
    supplierId: number
    
    @Column({nullable: false})
    proyectId: number

    @ManyToOne(() => Suppllier, supplier => supplier.contracts)
    supplier: Suppllier;

    @ManyToOne(() => Proyect, proyect => proyect.contracts)
    proyect: Proyect;
}