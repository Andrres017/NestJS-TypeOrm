import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProyectDto {
  @ApiProperty({
    description: 'Nombre del proyecto',
    example: 'Proyecto ABC',
  })
  @IsNotEmpty({ message: 'El nombre del proyecto no puede estar vacío' })
  @IsString({ message: 'El nombre del proyecto debe ser una cadena de caracteres' })
  name: string;
}

