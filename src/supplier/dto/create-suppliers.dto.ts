import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';


export enum documents {
    CC = "CC",
    NIT = "NIT"
}

export class CreateSupplierDto {
    @ApiProperty({
      description: 'Nombre completo del proveedor',
      example: 'Proveedor ABC',
    })
    @IsNotEmpty({ message: 'El nombre completo del proveedor no puede estar vacío' })
    @IsString({ message: 'El nombre completo del proveedor debe ser una cadena de caracteres' })
    fullName: string;
  
    @ApiProperty({
      description: 'Número de documento del proveedor',
      example: '123456789',
    })
    @IsNotEmpty({ message: 'El número de documento del proveedor no puede estar vacío' })
    @IsString({ message: 'El número de documento del proveedor debe ser una cadena de caracteres' })
    document: string;
  
    @ApiProperty({
      description: 'Tipo de documento del proveedor',
      example: 'NIT',
      enum: documents,
    })
    @IsNotEmpty({ message: 'El tipo de documento del proveedor no puede estar vacío' })
    @IsEnum(documents, { message: 'El tipo de documento del proveedor debe ser uno de los valores permitidos' })
    documentType: documents;
  }