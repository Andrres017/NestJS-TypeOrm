import { Module } from '@nestjs/common';
import { ProyectController } from './proyect.controller';
import { ProyectService } from './proyect.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyect } from './proyect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyect])],
  controllers: [ProyectController],
  providers: [ProyectService]
})
export class ProyectModule {}
