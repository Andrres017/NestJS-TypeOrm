import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {UsersService} from './users.service'
import {CreateUserDto, UpdateUserDto} from './dto/create-user.dto'
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post()
    createUser(@Body() newUser: CreateUserDto):Promise<User>{
        return this.userService.createUser(newUser)
    }

    @Get(':id')
    fiendUser(@Param('id') id:number):Promise<User>{
        return this.userService.getUser(id)
    }

    @Get()
    fiendUsers():Promise<User[]>{
        return this.userService.getUsers()
    }

    @Put(':id')
    updateUser(@Param('id') id:number, @Body() updateUser: UpdateUserDto):Promise <User>{
       return this.userService.updateUser(id, updateUser) 
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number):string{
        return this.userService.deleteUser(id)     
    }
}
