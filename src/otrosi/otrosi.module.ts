import { Module } from '@nestjs/common';
import { OtrosiController } from './otrosi.controller';
import { OtrosiService } from './otrosi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otrosi } from './otrosi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Otrosi])],
  controllers: [OtrosiController],
  providers: [OtrosiService]
})
export class OtrosiModule {}
