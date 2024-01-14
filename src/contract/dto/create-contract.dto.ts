import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsDateString, IsOptional, IsNumberString } from 'class-validator';

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
    numberContract: number;
  
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
    @IsNotEmpty()
    @IsNumberString()
    reteGarantia: number;
  
    @ApiProperty({
      description: 'Retención FIT',
      example: '5.8',
    })
    @IsNotEmpty()
    @IsNumberString()
    reteFit: number;
  
    @ApiProperty({
      description: 'Saldo de retención de garantía',
      example: '2.5',
      required: false,
    })
    @IsOptional()
    @IsNumberString()
    reteGarantiaSaldo?: number;
  
    @ApiProperty({
      description: 'Saldo de retención FIT',
      example: '1.2',
      required: false,
    })
    @IsOptional()
    @IsNumberString()
    reteFitSaldo?: number;
  
    @ApiProperty({
      description: 'Valor total del contrato',
      example: '50000.00',
    })
    @IsNotEmpty()
    @IsNumberString()
    contractValueTotal: number;
  
    @ApiProperty({
      description: 'Valor del contrato',
      example: '48000.00',
    })
    @IsNotEmpty()
    @IsNumberString()
    contractValue: number;
  
    @ApiProperty({
      description: 'ID del proveedor',
      example: '1',
    })
    @IsNotEmpty()
    @IsNumberString()
    supplierId: number;
  
    @ApiProperty({
      description: 'ID del proyecto',
      example: '1',
    })
    @IsNotEmpty()
    @IsNumberString()
    proyectId: number;
  }
