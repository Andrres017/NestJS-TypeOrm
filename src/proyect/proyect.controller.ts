import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ProyectService } from './proyect.service';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { Proyect } from './proyect.entity';

@ApiTags('proyect') // Etiqueta para Swagger
@Controller('proyect')
@UsePipes(new ValidationPipe({ transform: true })) 
export class ProyectController {

    constructor(private proyectService: ProyectService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo proyecto' })
    @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente', type: Proyect })
    createProyect(@Body() createProyectDto: CreateProyectDto) {
        return this.proyectService.createProyect(createProyectDto);
    }

    @Get()
    @ApiOperation({ summary: 'Buscar proyectos con paginación y filtros' })
    @ApiResponse({ status: 200, description: 'Proyectos encontrados exitosamente', type: [Proyect] })
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @ApiQuery({ name: 'name', type: String, required: false })
    findProyects(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('name') name: string,
    ) {
        return this.proyectService.getProyects(page, limit, name);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un proyecto por ID' })
    @ApiResponse({ status: 200, description: 'Proyecto encontrado exitosamente', type: Proyect })
    @ApiParam({ name: 'id', type: Number, description: 'ID del proyecto' })
    fiendProyect(@Param('id') id: number): Promise<Proyect> {
        return this.proyectService.getProyect(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un proyecto por ID' })
    @ApiResponse({ status: 200, description: 'Proyecto actualizado exitosamente', type: Proyect })
    @ApiParam({ name: 'id', type: Number, description: 'ID del proyecto' })
    updateProyect(@Param('id') id: number, @Body() updateProyectDto: CreateProyectDto) {
        return this.proyectService.updateProyect(id, updateProyectDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un proyecto por ID' })
    @ApiResponse({ status: 204, description: 'Proyecto eliminado exitosamente' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del proyecto' })
    deleteProyect(@Param('id') id: number) {
        return this.proyectService.deleteProyect(id);
    }
}
