export enum documents {
    CC = "CC",
    NIT = "NIT"
}

export class CreateSupplierDto{
    fullName: string
    document: string
    documentType: documents
}
