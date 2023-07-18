import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { Suppllier } from './supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Suppllier])],
  providers: [SupplierService],
  controllers: [SupplierController],
})
export class SupplierModule {}
