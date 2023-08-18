import { Contract } from "../contract.entity"
export enum contractType {
    Todo_costo = "Todo costo",
    Servicios = "Servicios",
    Mano_de_obra = "Mano de obra",
    Compra = "Compra"
}
export class CreateContractDto{

    numberContract: string
    dateStart: Date
    dateFinish: Date
    poliza: string
    contractType: contractType
    reteGarantia: string
    reteFit: string
    contractValueTotal: string
    supplierId: number
    proyectId:number
}
