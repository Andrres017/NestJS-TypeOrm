import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    fiendContracts(): Promise<Contract[]> {
        return this.contractService.getContracts()
    }

    @Get(':id')
    fiendContract(@Param('id') id: number): Promise<Contract> {
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
