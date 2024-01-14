import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Otrosi } from './otrosi.entity';
import { Repository } from 'typeorm';
import { OtrosiCreateDto, OtrosiUpdateDto } from './dto/otrosiDto';
import { ContractService } from 'src/contract/contract.service';
import { CreateContractDto } from 'src/contract/dto/create-contract.dto';

@Injectable()
export class OtrosiService {
    constructor(@InjectRepository(Otrosi) private otrosiRepository: Repository<Otrosi>, 
    private contractService: ContractService) { }

    async createOtrosi(otrosi: OtrosiCreateDto) {
        try {
            const findotrosi = await this.otrosiRepository.findOne({
                where: {
                    numeroOtrosi: otrosi.numeroOtrosi,
                    contract: otrosi.contract
                }
            });

            if (findotrosi !== null) {
                throw new HttpException('Otrosi duplicate', HttpStatus.CONFLICT);
            }

            const otrosiCreate = await this.otrosiRepository.save(otrosi);
            const otrosis = await this.otrosiRepository.find({where:{contract:otrosi.contract}})

            let contractValue=0 // valor pago del contrato
            for (const key in otrosis) {
                if(otrosis[key].accion === 'Positivo'){
                    contractValue = contractValue + otrosis[key].valorTotal
                }else{
                    contractValue = contractValue - otrosis[key].valorTotal
                }
            }
            const contractUpdate = {} as CreateContractDto
            contractUpdate.contractValue= contractValue
            await this.contractService.updateContract(otrosi.contract as unknown as number, contractUpdate)
            
            return otrosiCreate
        } catch (error) {
            throw new HttpException(`Error creating Otrosi: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateOtrosi(id: number, otrosi: OtrosiUpdateDto) {
        try {
            const otrosiUpdate = await this.otrosiRepository.update(id, otrosi);

            if (otrosiUpdate.affected === 0) {
                throw new HttpException('Otrosi not found', HttpStatus.NOT_FOUND);
            }

            const otrosiFind = await this.otrosiRepository.findOne({
                where: {
                    id: id
                }
            });

            return otrosiFind;
        } catch (error) {
            throw new HttpException(`Error updating Otrosi: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOtrosis(contract: any): Promise<Otrosi[]> {
        try {
            return this.otrosiRepository.find({ where: { contract: contract } });
        } catch (error) {
            throw new HttpException(`Error fetching Otrosis: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOtrosi(id: number): Promise<Otrosi> {
        try {
            const otrosi = await this.otrosiRepository.findOne({
                where: {
                    id: id
                }
            });

            if (!otrosi) {
                throw new HttpException('Otrosi not found', HttpStatus.NOT_FOUND);
            }

            return otrosi;
        } catch (error) {
            throw new HttpException(`Error fetching Otrosi: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteOtrosi(id: number) {
        try {
            const otrosiDelete = await this.otrosiRepository.delete(id);

            if (otrosiDelete.affected === 0) {
                throw new HttpException('Otrosi not found', HttpStatus.NOT_FOUND);
            }

            return otrosiDelete;
        } catch (error) {
            throw new HttpException(`Error deleting Otrosi: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
