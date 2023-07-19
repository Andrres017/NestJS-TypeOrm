import { Suppllier } from "src/supplier/supplier.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contract{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false,unique: true})
    numberContract: number

    @Column({ type: "date", nullable: false})
    dateStart: Date

    @Column({ type: "date", nullable: false})
    dateFinish: Date

    @Column({nullable: true})
    poliza: string

    @Column({nullable: false})
    contractType: string

    @Column({nullable: false})
    reteGarantia: number

    @Column({nullable: false})
    reteFit: number

    @Column({nullable: false})
    contractValueTotal: number

    @Column({nullable: false})
    supplierId: number
    
    @ManyToOne(() => Suppllier, supplier => supplier.contracts)
    supplier: Suppllier;
}