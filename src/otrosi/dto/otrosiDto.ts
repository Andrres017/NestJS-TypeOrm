//import { Contract } from "src/contract/contract.entity"
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsEnum, IsInstance, IsNumberString } from 'class-validator';
import { Contract } from '../../contract/contract.entity';

export enum acciones {
  // Define tus acciones aquí
  // Ejemplo:
  Crear = 'Crear',
  Modificar = 'Modificar',
  Eliminar = 'Eliminar',
}

export enum acciones {
    Positivo = "Positivo",
    Negativo = "Negativo"
}


export class OtrosiCreateDto {
  @ApiProperty({
    description: 'Número de Otrosí',
    example: 1,
  })
  @IsNotEmpty({ message: 'El número de Otrosí no puede estar vacío' })
  @IsNumber({}, { message: 'El número de Otrosí debe ser un número' })
  numeroOtrosi: string;

  @ApiProperty({
    description: 'Concepto del Otrosí',
    example: 'Aumento de plazo',
  })
  @IsNotEmpty({ message: 'El concepto no puede estar vacío' })
  @IsString({ message: 'El concepto debe ser una cadena de caracteres' })
  concepto: string;

  @ApiProperty({
    description: 'Fecha del Otrosí',
    example: '2024-01-01',
  })
  @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
  @IsDate({ message: 'La fecha debe tener el formato de fecha ISO' })
  fecha: Date;

  @ApiProperty({
    description: 'Valor Total del Otrosí',
    example: '5000.00',
  })
  @IsNotEmpty({ message: 'El valor total no puede estar vacío' })
  @IsNumberString()
  valorTotal: string;

  @ApiProperty({
    description: 'Acción del Otrosí',
    example: 'Crear',
    enum: acciones,
  })
  @IsNotEmpty({ message: 'La acción no puede estar vacía' })
  @IsEnum(acciones, { message: 'La acción debe ser uno de los valores permitidos' })
  accion: acciones;

  @ApiProperty({
    description: 'Contrato relacionado',
    type: () => Contract,
  })
  @IsNotEmpty({ message: 'El contrato no puede estar vacío' })
  @IsInstance(Contract, { message: 'El contrato debe ser una instancia válida de Contract' })
  contract: Contract;
}

export class OtrosiUpdateDto {
  @ApiProperty({
    description: 'ID del Otrosí a actualizar',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID no puede estar vacío' })
  @IsNumber({}, { message: 'El ID debe ser un número' })
  id: number;

  @ApiProperty({
    description: 'Número de Otrosí',
    example: 1,
  })
  @IsNotEmpty({ message: 'El número de Otrosí no puede estar vacío' })
  @IsNumber({}, { message: 'El número de Otrosí debe ser un número' })
  numeroOtrosi: string;

  @ApiProperty({
    description: 'Concepto del Otrosí',
    example: 'Aumento de plazo',
  })
  @IsNotEmpty({ message: 'El concepto no puede estar vacío' })
  @IsString({ message: 'El concepto debe ser una cadena de caracteres' })
  concepto: string;

  @ApiProperty({
    description: 'Fecha del Otrosí',
    example: '2024-01-01',
  })
  @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
  @IsDate({ message: 'La fecha debe tener el formato de fecha ISO' })
  fecha: Date;

  @ApiProperty({
    description: 'Valor Total del Otrosí',
    example: '5000.00',
  })
  @IsNotEmpty({ message: 'El valor total no puede estar vacío' })
  @IsNumberString()
  valorTotal: string;

  @ApiProperty({
    description: 'Acción del Otrosí',
    example: 'Crear',
    enum: acciones,
  })
  @IsNotEmpty({ message: 'La acción no puede estar vacía' })
  @IsEnum(acciones, { message: 'La acción debe ser uno de los valores permitidos' })
  accion: acciones;

  @ApiProperty({
    description: 'Contrato relacionado',
    type: () => Contract,
  })
  @IsNotEmpty({ message: 'El contrato no puede estar vacío' })
  @IsInstance(Contract, { message: 'El contrato debe ser una instancia válida de Contract' })
  contract: Contract;
}


