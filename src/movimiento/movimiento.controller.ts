import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MovimientoService } from './movimiento.service';
import { MovimientoCreateDto, MovimientoUpdateDto } from './dto/movimientosDto';
import { Movimientos } from './movimiento.entity';

@ApiTags('movimiento') // Etiqueta para Swagger
@Controller('movimiento')
@UsePipes(new ValidationPipe({ transform: true })) 
export class MovimientoController {

    constructor(private movimientosService: MovimientoService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo movimiento' })
    @ApiResponse({ status: 201, description: 'Movimiento creado exitosamente', type: Movimientos })
    createMovimiento(@Body() movimiento: MovimientoCreateDto) {
        return this.movimientosService.createMovimiento(movimiento);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un movimiento por ID' })
    @ApiResponse({ status: 200, description: 'Movimiento encontrado exitosamente', type: Movimientos })
    @ApiParam({ name: 'id', type: Number, description: 'ID del movimiento' })
    fiendMovmineto(@Param('id') id: number): Promise<Movimientos> {
        return this.movimientosService.getMovimiento(id);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los movimientos' })
    @ApiResponse({ status: 200, description: 'Movimientos encontrados exitosamente', type: [Movimientos] })
    fiendMovminetos(): Promise<Movimientos[]> {
        return this.movimientosService.getMovimientos();
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un movimiento por ID' })
    @ApiResponse({ status: 200, description: 'Movimiento actualizado exitosamente', type: Movimientos })
    @ApiParam({ name: 'id', type: Number, description: 'ID del movimiento' })
    updateMovimiento(@Param('id') id: number, @Body() updateMovimiento: MovimientoUpdateDto) {
        return this.movimientosService.updateMovimiento(id, updateMovimiento);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un movimiento por ID' })
    @ApiResponse({ status: 204, description: 'Movimiento eliminado exitosamente' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del movimiento' })
    deleteMovimiento(@Param('id') id: number) {
        return this.movimientosService.deleteMovimiento(id);
    }
}
