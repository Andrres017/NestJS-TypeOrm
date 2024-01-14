import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';

@Injectable()
export class ContractService {
    constructor(@InjectRepository(Contract) private contractRepository: Repository<Contract>) { }

    async createContract(contract: CreateContractDto) {
        try {
            const findContract = await this.contractRepository.findOne({
                where: {
                    numberContract: contract.numberContract
                },
            });

            if (findContract !== null) {
                throw new HttpException('Contract duplicate', HttpStatus.CONFLICT);
            }

            return this.contractRepository.save(contract);
        } catch (error) {
            throw new HttpException(`Error creating contract: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateContract(id: number, contract: CreateContractDto) {
        try {
            const contractUpdate = await this.contractRepository.update(id, contract);

            if (contractUpdate.affected === 0) {
                throw new HttpException('Contract not found', HttpStatus.NOT_FOUND);
            }

            const contractfind = await this.contractRepository.findOne({
                where: {
                    id: id
                },
                relations: ['supplier', 'proyect', 'movimiento']
            });

            return contractfind;
        } catch (error) {
            throw new HttpException(`Error updating contract: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findContracts(
        page: number,
        limit: number,
        numberContract: string,
        supplierId: number,
        proyectId: number,
        contractType: string,
    ): Promise<{ contracts: Contract[]; total: number; page: string; limit: string }> {
        try {
            const skip = (page - 1) * limit;

            const queryBuilder = this.contractRepository
                .createQueryBuilder('contract')
                .leftJoinAndSelect('contract.supplier', 'supplier')
                .leftJoinAndSelect('contract.proyect', 'proyect')
                .leftJoinAndSelect('contract.movimiento', 'movimiento')
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
        } catch (error) {
            throw new HttpException(`Error fetching contracts: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getContract(id: number): Promise<Contract> {
        try {
            const contract = await this.contractRepository.findOne({
                where: {
                    id
                },
                relations: ['supplier', 'proyect', 'movimiento']
            });

            if (!contract) {
                throw new HttpException('Contract not found', HttpStatus.NOT_FOUND);
            }

            return contract;
        } catch (error) {
            throw new HttpException(`Error fetching contract: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteContract(id: number) {
        try {
            const contractDelete = await this.contractRepository.delete(id);

            if (contractDelete.affected === 0) {
                throw new HttpException('Contract not found', HttpStatus.NOT_FOUND);
            }

            return contractDelete;
        } catch (error) {
            throw new HttpException(`Error deleting contract: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
