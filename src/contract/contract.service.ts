import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';

@Injectable()
export class ContractService {
    constructor(@InjectRepository(Contract) private contractRepository: Repository<Contract>) { }


    async createContract(contract: CreateContractDto) {
        const findContract = await this.contractRepository.findOne({
            where: {
                numberContract: contract.numberContract
            }
        })

        if (findContract !== null) {    
            throw new HttpException('Contract duplicate', HttpStatus.CONFLICT)
        }

        return this.contractRepository.save(contract)
    }


    async updateContract(id: number, contract: CreateContractDto) {
        const contractUpdate = await this.contractRepository.update(id, contract)
        if (contractUpdate.affected === 0) {
            throw new HttpException('Contract not found', HttpStatus.NOT_FOUND)
        }
        const contractfind = await this.contractRepository.findOne({
            where: {
                id: id
            }
        })
        return contractfind
    }

    getContracts(): Promise<Contract[]> {
        return this.contractRepository.find({
            relations: ['supplier', 'proyect']
        })
    }

    getContract(id: number): Promise<Contract> {
        return this.contractRepository.findOne({
            where: {
                id: id
            },
            relations: ['supplier', 'proyectId']
        })
    }

    async deleteContract(id: number) {
        const contractDelete = await this.contractRepository.delete(id)
        if (contractDelete.affected === 0) {
            throw new HttpException('Contract not found', HttpStatus.NOT_FOUND)
        }
        return contractDelete
    }

}
