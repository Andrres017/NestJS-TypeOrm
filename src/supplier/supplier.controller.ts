import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-suppliers.dto';
import { SupplierService } from './supplier.service';
import { Suppllier } from './supplier.entity';

@Controller('supplier')
export class SupplierController {

    constructor(private supplierService: SupplierService) { }


    @Post()
    createSupplier(@Body() Suppllier: CreateSupplierDto) {
        this.supplierService.createSupplier(Suppllier)
    }

    @Get()
    fiendSuppliers(): Promise<Suppllier[]> {
        return this.supplierService.getSuppliers()
    }

    @Get(':id')
    fiendSupplier(@Param('id') id: number): Promise<Suppllier> {
        return this.supplierService.getSupplier(id)
    }

    @Put(':id')
    updateSpplier(@Param('id') id: number, @Body() updateSpplier: CreateSupplierDto) {
        return this.supplierService.updateSupplier(id, updateSpplier)
    }

    @Delete(':id')
    deleteSuppliers(@Param('id') id: number) {
        return this.supplierService.deleteSupplier(id)
    }
}
