import { Contract } from "src/contract/contract.entity"

export enum acciones {
    Positivo = "Positivo",
    Negativo = "Negativo"
}

export class MovimientoCreateDto {
    numeroCe: number
    concepto: string
    fecha: string
    valorTotal: string
    valorReteFit: string
    accionReteFit: acciones
    valorReteGarantia: string
    accionRetegarantia: acciones
    contract: Contract;
}

export class MovimientoUpdateDto {
    id: number
    numeroCe: number
    concepto: string
    fecha: string
    valorTotal: string
    valorReteFit: string
    accionReteFit: acciones
    valorReteGarantia: string
    accionRetegarantia: acciones
    contract: Contract;
}