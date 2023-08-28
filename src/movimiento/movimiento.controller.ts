import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoCreateDto, MovimientoUpdateDto } from './dto/movimientosDto';
import { Movimientos } from './movimiento.entity';

@Controller('movimiento')
export class MovimientoController {

    constructor(private movimientosService: MovimientoService) { }


    @Post()
    createMovimiento(@Body() movimiento: MovimientoCreateDto) {
        return this.movimientosService.createMovimiento(movimiento)
    }

    @Get(':id')
    fiendMovmineto(@Param('id') id: number): Promise<Movimientos> {
        return this.movimientosService.getMovimiento(id)
    }

    @Get()
    fiendMovminetos(): Promise<Movimientos[]> {
        return this.movimientosService.getMovimientos()
    }

    @Put(':id')
    updateMovimiento(@Param('id') id: number, @Body() updateMovimiento: MovimientoUpdateDto) {
        return this.movimientosService.updateMovimiento(id, updateMovimiento)
    }

    @Delete(':id')
    deleteMovimiento(@Param('id') id: number) {
        return this.movimientosService.deleteMovimiento(id)
    }
}
