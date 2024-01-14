import { Module } from '@nestjs/common';
import { OtrosiController } from './otrosi.controller';
import { OtrosiService } from './otrosi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otrosi } from './otrosi.entity';
import { ContractModule } from 'src/contract/contract.module';

@Module({
  imports: [TypeOrmModule.forFeature([Otrosi]), ContractModule],
  controllers: [OtrosiController],
  providers: [OtrosiService]
})
export class OtrosiModule {}
