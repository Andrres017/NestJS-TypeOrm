import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Otrosi } from './otrosi.entity';
import { Repository } from 'typeorm';
import { OtrosiCreateDto, OtrosiUpdateDto } from './dto/otrosiDto';

@Injectable()
export class OtrosiService {
    constructor(@InjectRepository(Otrosi) private otrosiRepository: Repository<Otrosi>) { }

    async createOtrosi(otrosi: OtrosiCreateDto) {
        const findotrosi = await this.otrosiRepository.findOne({
            where: {
                numeroOtrosi: otrosi.numeroOtrosi
            }
        })
        if (findotrosi !== null) {
            return new HttpException('Otrosi duplicate', HttpStatus.CONFLICT)
        }else{
            return await this.otrosiRepository.save(otrosi)
        }
    }

    async updateOtrosi(id: number, otrosi: OtrosiUpdateDto) {
        const otrosiUpdate = await this.otrosiRepository.update(id, otrosi)
        if (otrosiUpdate.affected === 0) {
            throw new HttpException('otrosi not found', HttpStatus.NOT_FOUND)
        }
        const otrosiFind = await this.otrosiRepository.findOne({
            where: {
                id: id
            }
        })
        return otrosiFind
    }

    getOtrosis(): Promise<Otrosi[]>{
        return this.otrosiRepository.find()
    }

    getOtrosi(id: number): Promise<Otrosi> {
        return this.otrosiRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async deleteOtrosi(id: number) {
        const otrosiDelete = await this.otrosiRepository.delete(id)
        
        if(otrosiDelete.affected===0){
            throw new HttpException('otrosi not found', HttpStatus.NOT_FOUND)
        }

        return otrosiDelete
    }
}
