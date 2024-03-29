import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsDateString, IsOptional, IsNumberString, IsNumber, IsString } from 'class-validator';

export enum contractType {
    Todo_costo = "Todo costo",
    Servicios = "Servicios",
    Mano_de_obra = "Mano de obra",
    Compra = "Compra"
}
export class CreateContractDto {
    @ApiProperty({
      description: 'Número de contrato',
      example: 'ABC123',
    })
    @IsNotEmpty()
    numberContract: string;
  
    @ApiProperty({
      description: 'Fecha de inicio del contrato',
      example: '2022-01-01',
    })
    @IsNotEmpty()
    @IsDateString()
    dateStart: Date;
  
    @ApiProperty({
      description: 'Fecha de finalización del contrato',
      example: '2022-12-31',
    })
    @IsNotEmpty()
    @IsDateString()
    dateFinish: Date;
  
    @ApiProperty({
      description: 'Número de póliza',
      example: 'XYZ456',
      required: false,
    })
    poliza: string;

    @ApiProperty({
      description: 'Descripcion',
      example: 'lorem',
      required: false,
    })
    description: string;

    @ApiProperty({
      description: 'Tipo de contrato',
      enum: contractType,
      example: contractType.Todo_costo,
    })
    @IsNotEmpty()
    @IsEnum(contractType)
    contractType: contractType;
  
    @ApiProperty({
      description: 'Retención de garantía',
      example: '10.5',
    })
    @IsOptional()
    @IsString()
    reteGarantia: string;
  
    @ApiProperty({
      description: 'Retención FIT',
      example: '5.8',
    })
    @IsOptional()
    @IsString()
    reteFit: string;
  
    @ApiProperty({
      description: 'Saldo de retención de garantía',
      example: '2.5',
      required: false,
    })
    @IsOptional()
    @IsString()
    reteGarantiaSaldo?: string;
  
    @ApiProperty({
      description: 'Saldo de retención FIT',
      example: '1.2',
      required: false,
    })
    @IsOptional()
    @IsString()
    reteFitSaldo?: string;
  
    @ApiProperty({
      description: 'Valor total del contrato',
      example: '50000.00',
    })
    @IsNotEmpty()
    @IsString()
    contractValueTotal: string;
  
    @ApiProperty({
      description: 'Valor del contrato',
      example: '48000.00',
    })
    @IsOptional()
    @IsString()
    contractValue: string;
  
    @ApiProperty({
      description: 'ID del proveedor',
      example: '1',
    })
    @IsNotEmpty()
    @IsNumber()
    supplierId: number;
  
    @ApiProperty({
      description: 'ID del proyecto',
      example: '1',
    })
    @IsNotEmpty()
    @IsNumber()
    proyectId: number;
  }
