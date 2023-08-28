import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimientos } from './movimiento.entity';
import { MovimientoController } from './movimiento.controller';
import { MovimientoService } from './movimiento.service';

@Module(
{   
    imports: [TypeOrmModule.forFeature([Movimientos])],
    controllers: [MovimientoController],
    providers: [MovimientoService]
})
export class MovimientoModule {
  
}
