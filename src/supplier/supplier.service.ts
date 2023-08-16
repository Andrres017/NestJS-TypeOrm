import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Suppllier } from './supplier.entity'
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSupplierDto } from './dto/create-suppliers.dto';

@Injectable()
export class SupplierService {
    constructor(@InjectRepository(Suppllier) private supplierRepository: Repository<Suppllier>) { }

    async createSupplier(supplier: CreateSupplierDto) {
        const findSupplier = await this.supplierRepository.findOne({
            where: {
                document: supplier.document
            }
        })
        if (findSupplier !== null) {

            console.log("Duplicado ")
            return new HttpException('Supplier duplicate', HttpStatus.CONFLICT)
        }else{
            return await this.supplierRepository.save(supplier)
        }
    }

    async updateSupplier(id: number, supplier: CreateSupplierDto) {
        const supplierUpdate = await this.supplierRepository.update(id, supplier)
        if (supplierUpdate.affected === 0) {
            throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND)
        }
        const supplierfind = await this.supplierRepository.findOne({
            where: {
                id: id
            }
        })
        return supplierfind
    }

    getSuppliers(){
        return this.supplierRepository.find()
    }

    async findWithPaginationAndFilters(
        page: number,
        limit: number,
        fullName: string,
        document: string,
      ){
        const skip = (page - 1) * limit;
    
        const [items, total] = await this.supplierRepository.findAndCount({
          where: {
            fullName: Like(`%${fullName || ''}%`), document: Like(`%${document || ''}%`)
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

    getSupplier(id: number): Promise<Suppllier> {
        return this.supplierRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async deleteSupplier(id: number) {
        console.log(id)
        const supplierDelete = await this.supplierRepository.delete(id)
        
        if(supplierDelete.affected===0){
            throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND)
        }

        return supplierDelete
    }
}
