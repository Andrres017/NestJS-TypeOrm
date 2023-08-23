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
            },
        })
        console.log(contract.numberContract, findContract,contract)

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

    async findContracts(
        page: number,
        limit: number,
        numberContract: string,
        supplierId: number,
        proyectId: number,
        contractType: string,
      ): Promise<{ contracts: Contract[]; total: number; page: string; limit: string }> {
        const skip = (page - 1) * limit;
    
        const queryBuilder = this.contractRepository
          .createQueryBuilder('contract')
          .leftJoinAndSelect('contract.supplier', 'supplier')
          .leftJoinAndSelect('contract.proyect', 'proyect')
          .where('1 = 1'); // Default condition to start the query
    
        if (numberContract) {
          queryBuilder.andWhere('contract.numberContract LIKE :numberContract', {
            numberContract: `%${numberContract}%`,
          });
        }
    
        if (supplierId) {
          queryBuilder.andWhere('contract.supplierId = :supplierId', {
            supplierId,
          });
        }
    
        if (proyectId) {
          queryBuilder.andWhere('contract.proyectId = :proyectId', {
            proyectId,
          });
        }
    
        if (contractType) {
          queryBuilder.andWhere('contract.contractType = :contractType', {
            contractType,
          });
        }
    
        const [contracts, total] = await queryBuilder
          .skip(skip)
          .take(limit)
          .getManyAndCount();
    
        return { contracts, total, page: String(page), limit: String(limit) };
      }

    async getContract(id: number): Promise<Contract> {
        return await this.contractRepository.findOne({
            where: {
                id
            },
            relations: ['supplier', 'proyect']
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
