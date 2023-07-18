import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Suppllier{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    fullName: string

    @Column({ nullable: false,unique: true })
    document: number

    @Column({
        nullable: false,
        type: "enum",
        enum: ['CC', 'NIT']
    })
    documentType: string
}