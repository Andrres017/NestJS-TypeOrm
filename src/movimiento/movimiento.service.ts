import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimientos } from './movimiento.entity';
import { Repository } from 'typeorm';
import { MovimientoCreateDto, MovimientoUpdateDto } from './dto/movimientosDto';

@Injectable()
export class MovimientoService {

    constructor(@InjectRepository(Movimientos) private movimientoRepository: Repository<Movimientos>) { }

    async createMovimiento(movimiento: MovimientoCreateDto) {
        const findmovimiento = await this.movimientoRepository.findOne({
            where: {
                numeroCe: movimiento.numeroCe
            }
        })
        if (findmovimiento !== null) {
            return new HttpException('Movimiento duplicate', HttpStatus.CONFLICT)
        }else{
            return await this.movimientoRepository.save(movimiento)
        }
    }

    async updateMovimiento(id: number, contract: MovimientoUpdateDto) {
        const movimientoUpdate = await this.movimientoRepository.update(id, contract)
        if (movimientoUpdate.affected === 0) {
            throw new HttpException('Movimiento not found', HttpStatus.NOT_FOUND)
        }
        const movimientoFind = await this.movimientoRepository.findOne({
            where: {
                id: id
            }
        })
        return movimientoFind
    }

    getMovimientos(): Promise<Movimientos[]>{
        return this.movimientoRepository.find()
    }

    getMovimiento(id: number): Promise<Movimientos> {
        return this.movimientoRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async deleteMovimiento(id: number) {
        const movimientoDelete = await this.movimientoRepository.delete(id)
        
        if(movimientoDelete.affected===0){
            throw new HttpException('movimiento not found', HttpStatus.NOT_FOUND)
        }

        return movimientoDelete
    }
}
