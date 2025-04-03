import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import { JwtService } from '@nestjs/jwt';
import { HttpException , } from '@nestjs/common/exceptions/http.exception';
import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private createUserDto: Repository<User>,
  private JWTService: JwtService,
    // private jwtService: JwtService,
  ) { }

async findEmail(email: string) {
const userEmail = await this.createUserDto.findOneBy({ email });
if (!userEmail) {
  throw new ConflictException('Email already exists');
}
return userEmail;
}

async user (headers:any){
  const authorizationHeader =headers.authorization;
  if (authorizationHeader) {
const token = authorizationHeader.replace('Berrer ', '');

const secret = process.env.JWTSecret;

try{
  const decoded =this.JWTService.verify(token);
  let id = decoded["id"];
  let user =await this.createUserDto.findOneBy({id});

  return { id: id, name: user?.firstName, email: user?.email, lastName: user?.lastName } ;
}
catch (error) {
  throw new HttpException('invalid token', 401);
  } 
}else{
  throw new HttpException('invalid or missing Berer token' ,401);
}

}
  
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
