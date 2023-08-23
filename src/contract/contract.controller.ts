import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { Contract } from './contract.entity';

@Controller('contract')
export class ContractController {

    
    constructor(private contractService: ContractService) { }


    @Post()
    createContract(@Body() contract: CreateContractDto) {
        return this.contractService.createContract(contract)
    }

    @Get()
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
    fiendContract(@Param('id') id: number): Promise<Contract> {
      console.log(id)
        return this.contractService.getContract(id)
    }

    @Put(':id')
    updateContract(@Param('id') id: number, @Body() updateContract: CreateContractDto) {
        return this.contractService.updateContract(id, updateContract)
    }

    @Delete(':id')
    deleteContract(@Param('id') id: number) {
        return this.contractService.deleteContract(id)
    }
}
