import { Movimientos } from "src/movimiento/movimiento.entity";
import { Otrosi } from "src/otrosi/otrosi.entity";
import { Proyect } from "src/proyect/proyect.entity";
import { Suppllier } from "src/supplier/supplier.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({nullable: true, type: 'float', default:0})
    reteGarantia: number

    @Column({nullable: true, type: 'float', default:0})
    reteFit: number

    @Column({nullable: true, type: 'float', default:0})
    reteGarantiaSaldo: number

    @Column({nullable: true, type: 'float', default:0})
    reteFitSaldo: number

    @Column({nullable: false,  type: 'float'})
    contractValueTotal: number

    @Column({nullable: false,  type: 'float', default:0})
    contractValue: number

    @Column({nullable: true,  type: 'text'})
    description: string

    @Column({nullable: false})
    supplierId: number
    
    @Column({nullable: false})
    proyectId: number

    @ManyToOne(() => Suppllier, supplier => supplier.contracts)
    supplier: Suppllier;

    @ManyToOne(() => Proyect, proyect => proyect.contracts)
    proyect: Proyect;

    @OneToMany(() => Movimientos, movimiento => movimiento.contract)
    movimiento: Movimientos[];
    
    @OneToMany(() => Otrosi, otrosi => otrosi.contract)
    otrosi: Otrosi[];
}