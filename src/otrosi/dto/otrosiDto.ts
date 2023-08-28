import { Contract } from "src/contract/contract.entity"

export enum acciones {
    Positivo = "Positivo",
    Negativo = "Negativo"
}

export class OtrosiCreateDto {
    numeroOtrosi: number
    concepto: string
    fecha: string
    valorTotal: string
    accion: acciones
    contract: Contract;
}

export class OtrosiUpdateDto {
    id: number
    numeroOtrosi: number
    concepto: string
    fecha: string
    valorTotal: string
    accion: acciones
    contract: Contract;
}