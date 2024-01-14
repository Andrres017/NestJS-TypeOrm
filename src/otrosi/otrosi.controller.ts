import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OtrosiService } from './otrosi.service';
import { OtrosiCreateDto, OtrosiUpdateDto } from './dto/otrosiDto';
import { Otrosi } from './otrosi.entity';

@ApiTags('otrosi') // Etiqueta para Swagger
@Controller('otrosi')
@UsePipes(new ValidationPipe({ transform: true })) 
export class OtrosiController {
    constructor(private otrosiService: OtrosiService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo Otrosí' })
    @ApiResponse({ status: 201, description: 'Otrosí creado exitosamente', type: Otrosi })
    createOtrosi(@Body() otrosi: OtrosiCreateDto) {
        return this.otrosiService.createOtrosi(otrosi);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un Otrosí por ID' })
    @ApiResponse({ status: 200, description: 'Otrosí encontrado exitosamente', type: Otrosi })
    @ApiParam({ name: 'id', type: Number, description: 'ID del Otrosí' })
    fiendOtrosi(@Param('id') id: number): Promise<Otrosi> {
        return this.otrosiService.getOtrosi(id);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los Otrosíes' })
    @ApiResponse({ status: 200, description: 'Otrosíes encontrados exitosamente', type: [Otrosi] })
    fiendOtrosis(
        @Query('contract') contract: string,
    ): Promise<Otrosi[]> {
        return this.otrosiService.getOtrosis(contract);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un Otrosí por ID' })
    @ApiResponse({ status: 200, description: 'Otrosí actualizado exitosamente', type: Otrosi })
    @ApiParam({ name: 'id', type: Number, description: 'ID del Otrosí' })
    updateOtrosi(@Param('id') id: number, @Body() updateOtrosi: OtrosiUpdateDto) {
        return this.otrosiService.updateOtrosi(id, updateOtrosi);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un Otrosí por ID' })
    @ApiResponse({ status: 204, description: 'Otrosí eliminado exitosamente' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del Otrosí' })
    deleteOtrosi(@Param('id') id: number) {
        return this.otrosiService.deleteOtrosi(id);
    }
}
