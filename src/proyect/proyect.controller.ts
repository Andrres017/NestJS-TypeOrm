import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProyectService } from './proyect.service';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { Proyect } from './proyect.entity';

@Controller('proyect')
export class ProyectController {


    constructor(private proyectService: ProyectService) { }


    @Post()
    createProyect(@Body() proyect: CreateProyectDto) {
        return this.proyectService.createProyect(proyect)
    }

    @Get()
    findProyects(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('name') name: string,
  ) {
    return this.proyectService.getProyects(page, limit, name);
  }

    @Get(':id')
    fiendProyect(@Param('id') id: number): Promise<Proyect> {
        return this.proyectService.getProyect(id)
    }

    @Put(':id')
    updateProyect(@Param('id') id: number, @Body() updateProyect: CreateProyectDto) {
        return this.proyectService.updateProyect(id, updateProyect)
    }

    @Delete(':id')
    deleteProyect(@Param('id') id: number) {
        return this.proyectService.deleteProyect(id)
    }

}
