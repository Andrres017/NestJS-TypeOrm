import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Proyect } from './proyect.entity';
import { CreateProyectDto } from './dto/create-proyect.dto';

@Injectable()
export class ProyectService {
    
    constructor(@InjectRepository(Proyect) private proyectRepository: Repository<Proyect>) { }
    

    async createProyect(proyect: CreateProyectDto) {
        try {
            const findProyect = await this.proyectRepository.findOne({
                where: {
                    name: proyect.name
                }
            });

            if (findProyect !== null) {
                throw new HttpException('Proyect duplicate', HttpStatus.CONFLICT);
            }

            return this.proyectRepository.save(proyect);
        } catch (error) {
            throw new HttpException(`Error creating project: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProyect(id: number, proyect: CreateProyectDto) {
        try {
            const proyectUpdate = await this.proyectRepository.update(id, proyect);

            if (proyectUpdate.affected === 0) {
                throw new HttpException('Proyect not found', HttpStatus.NOT_FOUND);
            }

            const proyectfind = await this.proyectRepository.findOne({
                where: {
                    id: id
                }
            });

            return proyectfind;
        } catch (error) {
            throw new HttpException(`Error updating project: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getProyects(page: number, limit: number, name: string): Promise<any> {
        try {
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
        } catch (error) {
            throw new HttpException(`Error fetching projects: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getProyect(id: number): Promise<Proyect> {
        try {
            const proyect = await this.proyectRepository.findOne({
                where: {
                    id: id
                }
            });

            if (!proyect) {
                throw new HttpException('Proyect not found', HttpStatus.NOT_FOUND);
            }

            return proyect;
        } catch (error) {
            throw new HttpException(`Error fetching project: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProyect(id: number) {
        try {
            const proyectDelete = await this.proyectRepository.delete(id);

            if (proyectDelete.affected === 0) {
                throw new HttpException('Proyect not found', HttpStatus.NOT_FOUND);
            }

            return proyectDelete;
        } catch (error) {
            throw new HttpException(`Error deleting project: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
