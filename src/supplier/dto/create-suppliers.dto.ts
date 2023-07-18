export enum documents {
    open = "open",
    close = "close",
    pending = "pending"
}

export class CreateSupplierDto{
    fullName: string
    document: number
    documentType: documents
}
