import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@ApiTags('users') // Etiqueta para Swagger
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true })) 
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: User })
    createUser(@Body() newUser: CreateUserDto): Promise<User> {
        return this.userService.createUser(newUser);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente', type: User })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
    fiendUser(@Param('id') id: number): Promise<User> {
        return this.userService.getUser(id);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Usuarios encontrados exitosamente', type: [User] })
    fiendUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente', type: User })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
    updateUser(@Param('id') id: number, @Body() updateUser: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, updateUser);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    @ApiResponse({ status: 204, description: 'Usuario eliminado exitosamente' })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
    deleteUser(@Param('id') id: number): string {
        return this.userService.deleteUser(id);
    }
}
