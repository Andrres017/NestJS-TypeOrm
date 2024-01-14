import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Contract } from 'src/contract/contract.entity';

export enum ConceptoMovimiento {
  Contrato = 'Contrato',
  'Rete fic' = 'Rete fic',
  'Rete garantia' = 'Rete garantia',
}

export class MovimientoCreateDto {
  @ApiProperty({
    description: 'Tipo de documento',
    example: 'CE',
  })
  @IsNotEmpty({ message: 'El tipo de documento no puede estar vacío' })
  TipoDocumento: string;

  @ApiProperty({
    description: 'Número de comprobante de egreso',
    example: 123,
  })
  @IsNotEmpty({ message: 'El número de comprobante de egreso no puede estar vacío' })
  @IsNumber({}, { message: 'El número de comprobante de egreso debe ser un número' })
  numeroCe: number;

  @ApiProperty({
    description: 'Fecha del movimiento',
    example: '2024-01-01',
  })
  @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
  @IsDate({ message: 'La fecha debe tener el formato de fecha ISO' })
  fecha: Date;

  @ApiProperty({
    description: 'Valor a pagar',
    example: 5000.00,
  })
  @IsNotEmpty({ message: 'El valor a pagar no puede estar vacío' })
  @IsNumber({}, { message: 'El valor a pagar debe ser un número' })
  valorAPagar: number;

  @ApiProperty({
    description: 'Valor de la retención por concepto de Rete FIC',
    example: 250.00,
  })
  @IsNotEmpty({ message: 'El valor de la retención por concepto de Rete FIC no puede estar vacío' })
  @IsNumber({}, { message: 'El valor de la retención por concepto de Rete FIC debe ser un número' })
  valorReteFit: number;

  @ApiProperty({
    description: 'Valor de la retención por concepto de Rete Garantia',
    example: 150.00,
  })
  @IsNotEmpty({ message: 'El valor de la retención por concepto de Rete Garantia no puede estar vacío' })
  @IsNumber({}, { message: 'El valor de la retención por concepto de Rete Garantia debe ser un número' })
  valorReteGarantia: number;

  @ApiProperty({
    description: 'Concepto del movimiento',
    example: 'Contrato',
    enum: ConceptoMovimiento,
  })
  @IsNotEmpty({ message: 'El concepto no puede estar vacío' })
  @IsEnum(ConceptoMovimiento, { message: 'El concepto debe ser uno de los valores permitidos' })
  concepto: ConceptoMovimiento;

  @ApiProperty({
    description: 'Contrato relacionado',
    type: () => Contract,
  })
  @IsNotEmpty({ message: 'El contrato no puede estar vacío' })
  contract: Contract;
}

export class MovimientoUpdateDto {
  @ApiProperty({
    description: 'ID del movimiento a actualizar',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID no puede estar vacío' })
  @IsNumber({}, { message: 'El ID debe ser un número' })
  id: number;

  // Resto de las propiedades igual que en MovimientoCreateDto
  // ...

  @ApiProperty({
    description: 'Tipo de documento',
    example: 'CE',
  })
  @IsNotEmpty({ message: 'El tipo de documento no puede estar vacío' })
  TipoDocumento: string;

  @ApiProperty({
    description: 'Número de comprobante de egreso',
    example: 123,
  })
  @IsNotEmpty({ message: 'El número de comprobante de egreso no puede estar vacío' })
  @IsNumber({}, { message: 'El número de comprobante de egreso debe ser un número' })
  numeroCe: number;

  @ApiProperty({
    description: 'Fecha del movimiento',
    example: '2024-01-01',
  })
  @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
  @IsDate({ message: 'La fecha debe tener el formato de fecha ISO' })
  fecha: Date;

  @ApiProperty({
    description: 'Valor a pagar',
    example: 5000.00,
  })
  @IsNotEmpty({ message: 'El valor a pagar no puede estar vacío' })
  @IsNumber({}, { message: 'El valor a pagar debe ser un número' })
  valorAPagar: number;

  @ApiProperty({
    description: 'Valor de la retención por concepto de Rete FIC',
    example: 250.00,
  })
  @IsNotEmpty({ message: 'El valor de la retención por concepto de Rete FIC no puede estar vacío' })
  @IsNumber({}, { message: 'El valor de la retención por concepto de Rete FIC debe ser un número' })
  valorReteFit: number;

  @ApiProperty({
    description: 'Valor de la retención por concepto de Rete Garantia',
    example: 150.00,
  })
  @IsNotEmpty({ message: 'El valor de la retención por concepto de Rete Garantia no puede estar vacío' })
  @IsNumber({}, { message: 'El valor de la retención por concepto de Rete Garantia debe ser un número' })
  valorReteGarantia: number;

  @ApiProperty({
    description: 'Concepto del movimiento',
    example: 'Contrato',
    enum: ConceptoMovimiento,
  })
  @IsNotEmpty({ message: 'El concepto no puede estar vacío' })
  @IsEnum(ConceptoMovimiento, { message: 'El concepto debe ser uno de los valores permitidos' })
  concepto: ConceptoMovimiento;

  @ApiProperty({
    description: 'Contrato relacionado',
    type: () => Contract,
  })
  @IsNotEmpty({ message: 'El contrato no puede estar vacío' })
  contract: Contract;
}
