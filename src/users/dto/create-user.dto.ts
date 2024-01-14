import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'john_doe',
  })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres' })
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nuevo nombre de usuario',
    example: 'john_doe_updated',
  })
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres' })
  username?: string;

  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    example: 'newpassword123',
  })
  @IsOptional()
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  password?: string;

  @ApiProperty({
    description: 'Estrategia de autenticación',
    example: 'jwt',
  })
  @IsOptional()
  @IsString({ message: 'La estrategia de autenticación debe ser una cadena de caracteres' })
  authStrategy?: string;
}
