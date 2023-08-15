import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierModule } from './supplier/supplier.module';
import { ProyectModule } from './proyect/proyect.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'nestJS',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), UsersModule, SupplierModule, ProyectModule, ContractModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
