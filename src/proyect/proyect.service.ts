import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Proyect } from './proyect.entity';
import { CreateProyectDto } from './dto/create-proyect.dto';

@Injectable()
export class ProyectService {
    
    constructor(@InjectRepository(Proyect) private proyectRepository: Repository<Proyect>) { }
    

    async createProyect(proyect: CreateProyectDto) {
        const findProyect = await this.proyectRepository.findOne({
            where: {
                name: proyect.name
            }
        })

        if (findProyect!== null) {
            throw new HttpException('Proyect duplicate', HttpStatus.CONFLICT)
        }

        return this.proyectRepository.save(proyect)
    }

    async updateProyect(id: number, proyect: CreateProyectDto) {
        const proyectUpdate = await this.proyectRepository.update(id, proyect)
        if (proyectUpdate.affected === 0) {
            throw new HttpException('Proyect not found', HttpStatus.NOT_FOUND)
        }
        const proyectfind = await this.proyectRepository.findOne({
            where: {
                id: id
            }
        })
        return proyectfind
    }

    async getProyects(page: number, limit: number, name: string): Promise<any> {
        const skip = (page - 1) * limit;
    
        const [items, total] = await this.proyectRepository.findAndCount({
          where: {
            name: ILike(`%${name || ''}%`),
          },
          skip,
          take: limit,
        });
    
        return {
          items,
          total,
          page,
          limit,
        };
      }

    getProyect(id: number): Promise<Proyect> {
        return this.proyectRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async deleteProyect(id: number) {
        const proyectDelete = await this.proyectRepository.delete(id)
        if(proyectDelete.affected===0){
            throw new HttpException('Proyect not found', HttpStatus.NOT_FOUND)
        }
        return proyectDelete
    }
}
