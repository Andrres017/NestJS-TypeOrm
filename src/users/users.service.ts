import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Repository} from 'typeorm'
import {CreateUserDto, UpdateUserDto} from './dto/create-user.dto'
import { promises } from 'dns';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    createUser(user: CreateUserDto){
        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }

    getUsers(): Promise <User[]>{
        return this.userRepository.find();
    }

    getUser(id: number): Promise <User>{
        return this.userRepository.findOne({
            where:{
                id
            }
        })
    }

    async updateUser(id: number, updateUser:UpdateUserDto): Promise <User>{
        await this.userRepository.update(id, updateUser)
        return this.userRepository.findOne({
            where:{
                id
            }
        })
    }

    deleteUser(id: number): string{
        this.userRepository.delete(id)
        return "Eliminado"
    }

}
