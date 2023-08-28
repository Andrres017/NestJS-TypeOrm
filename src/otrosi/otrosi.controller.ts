import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OtrosiService } from './otrosi.service';
import { OtrosiCreateDto, OtrosiUpdateDto } from './dto/otrosiDto';
import { Otrosi } from './otrosi.entity';

@Controller('otrosi')
export class OtrosiController {
    constructor(private otrosiService: OtrosiService) { }


    @Post()
    createOtrosi(@Body() otrosi: OtrosiCreateDto) {
        return this.otrosiService.createOtrosi(otrosi)
    }

    @Get(':id')
    fiendOtrosi(@Param('id') id: number): Promise<Otrosi> {
        return this.otrosiService.getOtrosi(id)
    }

    @Get()
    fiendOtrosis(): Promise<Otrosi[]> {
        return this.otrosiService.getOtrosis()
    }

    @Put(':id')
    updateOtrosi(@Param('id') id: number, @Body() updateOtrosi: OtrosiUpdateDto) {
        return this.otrosiService.updateOtrosi(id, updateOtrosi)
    }

    @Delete(':id')
    deleteOtrosi(@Param('id') id: number) {
        return this.otrosiService.deleteOtrosi(id)
    }
}
