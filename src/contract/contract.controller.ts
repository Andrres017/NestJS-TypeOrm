import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { Contract } from './contract.entity';

@ApiTags('contract') // Etiqueta para Swagger
@Controller('contract')
@UsePipes(new ValidationPipe({ transform: true })) 
export class ContractController {
    
    constructor(private contractService: ContractService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo contrato' })
    @ApiResponse({ status: 201, description: 'Contrato creado exitosamente', type: Contract })
    createContract(@Body() contract: CreateContractDto) {
        return this.contractService.createContract(contract);
    }

    @Get()
    @ApiOperation({ summary: 'Buscar contratos' })
    @ApiResponse({ status: 200, description: 'Contratos encontrados exitosamente', type: [Contract] })
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'numberContract', type: String, required: false })
    @ApiQuery({ name: 'supplierId', type: Number, required: false })
    @ApiQuery({ name: 'proyectId', type: Number, required: false })
    @ApiQuery({ name: 'contractType', type: String, required: false })
    async findContracts(
        @Query('page') page = 1,
        @Query('limit') limit = 1,
        @Query('numberContract') numberContract: string,
        @Query('supplierId') supplierId: number,
        @Query('proyectId') proyectId: number,
        @Query('contractType') contractType: string,
    ) {
        const contracts = await this.contractService.findContracts(
            page,
            limit,
            numberContract,
            supplierId,
            proyectId,
            contractType,
        );
        return { contracts };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un contrato por ID' })
    @ApiResponse({ status: 200, description: 'Contrato encontrado exitosamente', type: Contract })
    fiendContract(@Param('id') id: number): Promise<Contract> {
        console.log(id);
        return this.contractService.getContract(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un contrato por ID' })
    @ApiResponse({ status: 200, description: 'Contrato actualizado exitosamente', type: Contract })
    updateContract(@Param('id') id: number, @Body() updateContract: CreateContractDto) {
        return this.contractService.updateContract(id, updateContract);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un contrato por ID' })
    @ApiResponse({ status: 204, description: 'Contrato eliminado exitosamente' })
    deleteContract(@Param('id') id: number) {
        return this.contractService.deleteContract(id);
    }
}
