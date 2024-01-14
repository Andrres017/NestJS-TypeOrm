import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Suppllier } from './supplier.entity'
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSupplierDto } from './dto/create-suppliers.dto';

@Injectable()
export class SupplierService {
    constructor(@InjectRepository(Suppllier) private supplierRepository: Repository<Suppllier>) { }

    async createSupplier(supplier: CreateSupplierDto) {
        try {
            const findSupplier = await this.supplierRepository.findOne({
                where: {
                    document: supplier.document
                }
            });

            if (findSupplier !== null) {
                throw new HttpException('Supplier duplicate', HttpStatus.CONFLICT);
            }

            return await this.supplierRepository.save(supplier);
        } catch (error) {
            throw new HttpException(`Error creating supplier: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateSupplier(id: number, supplier: CreateSupplierDto) {
        try {
            const supplierUpdate = await this.supplierRepository.update(id, supplier);

            if (supplierUpdate.affected === 0) {
                throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
            }

            const supplierfind = await this.supplierRepository.findOne({
                where: {
                    id: id
                }
            });

            return supplierfind;
        } catch (error) {
            throw new HttpException(`Error updating supplier: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getSuppliers() {
        try {
            return this.supplierRepository.find();
        } catch (error) {
            throw new HttpException(`Error fetching suppliers: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findWithPaginationAndFilters(
        page: number,
        limit: number,
        fullName: string,
        document: string,
    ) {
        try {
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
        } catch (error) {
            throw new HttpException(`Error fetching suppliers with pagination and filters: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getSupplier(id: number): Promise<Suppllier> {
        try {
            const supplier = await this.supplierRepository.findOne({
                where: {
                    id: id
                }
            });

            if (!supplier) {
                throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
            }

            return supplier;
        } catch (error) {
            throw new HttpException(`Error fetching supplier: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteSupplier(id: number) {
        try {
            const supplierDelete = await this.supplierRepository.delete(id);

            if (supplierDelete.affected === 0) {
                throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
            }

            return supplierDelete;
        } catch (error) {
            throw new HttpException(`Error deleting supplier: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
