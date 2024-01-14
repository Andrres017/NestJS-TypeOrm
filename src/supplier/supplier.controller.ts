import { Body, Controller, Post, Get, Param, Put, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateSupplierDto } from './dto/create-suppliers.dto';
import { SupplierService } from './supplier.service';
import { Suppllier as Supplier} from './supplier.entity';

@ApiTags('supplier') // Etiqueta para Swagger
@Controller('supplier')
@UsePipes(new ValidationPipe({ transform: true })) 
export class SupplierController {

    constructor(private supplierService: SupplierService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo proveedor' })
    @ApiResponse({ status: 201, description: 'Proveedor creado exitosamente', type: Supplier })
    createSupplier(@Body() supplier: CreateSupplierDto) {
        return this.supplierService.createSupplier(supplier);
    }

    @Get()
    @ApiOperation({ summary: 'Buscar proveedores con paginación y filtros' })
    @ApiResponse({ status: 200, description: 'Proveedores encontrados exitosamente', type: [Supplier] })
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'fullName', type: String, required: false })
    @ApiQuery({ name: 'document', type: String, required: false })
    fiendSuppliers(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('fullName') fullName: string,
        @Query('document') document: string,
    ) {
        return this.supplierService.findWithPaginationAndFilters(
            page,
            limit,
            fullName,
            document,
        );
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un proveedor por ID' })
    @ApiResponse({ status: 200, description: 'Proveedor encontrado exitosamente', type: Supplier })
    @ApiParam({ name: 'id', type: Number, description: 'ID del proveedor' })
    fiendSupplier(@Param('id') id: number): Promise<Supplier> {
        return this.supplierService.getSupplier(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un proveedor por ID' })
    @ApiResponse({ status: 200, description: 'Proveedor actualizado exitosamente', type: Supplier })
    @ApiParam({ name: 'id', type: Number, description: 'ID del proveedor' })
    updateSpplier(@Param('id') id: number, @Body() updateSupplier: CreateSupplierDto) {
        return this.supplierService.updateSupplier(id, updateSupplier);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un proveedor por ID' })
    @ApiResponse({ status: 204, description: 'Proveedor eliminado exitosamente' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del proveedor' })
    deleteSuppliers(@Param('id') id: number) {
        return this.supplierService.deleteSupplier(id);
    }
}
