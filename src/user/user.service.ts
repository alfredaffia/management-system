import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { HttpException , } from '@nestjs/common/exceptions/http.exception';
import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';
import { UserRole } from './enum/user.enum';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private createUserDto: Repository<User>,
  private JWTService: JwtService,
  ) { }

  async addUser(createUserDto: CreateUserDto) {
    // const { email } = createUserDto;
    const {  firstName,lastName, email, password, } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.createUserDto.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const add = this.createUserDto.create({
      firstName,
      lastName,
       email,
        password: hashedPassword,
        
    });
    // const isMatch = await bcrypt.compare(password, createUserDto.password)
    // if(!isMatch){
    //     throw new HttpException('invalid password',404)
    // }

    const payload = {   };
    const saveUser= await this.createUserDto.save(add) 
    return {
      userDetails: add,
      access_token: this.JWTService.sign({ email: 'user.email', sub: 'user.id',role:'user.role' })
    };
  }

async findEmail(email: string) {
const userEmail = await this.createUserDto.findOne({ where:{ email:email}}); 
if (!userEmail) {
  throw new ConflictException('Email already exists');
}
return userEmail;
}

async user (headers:any):Promise<any>{
  const authorizationHeader = headers.authorization;
  if (authorizationHeader) {
const token = authorizationHeader.replace('Bearer ', '');

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
  throw new HttpException('invalid or missing Bearer token' ,401);
}
}
  
  findAll() {
    return this.createUserDto.find();
  }

  async findOne(id: string) {
   const findUserById= await this.createUserDto.findOneBy({ id });
   if (!findUserById) {
    throw new HttpException('User not found', 404);
   }
   return findUserById;
  }

  async updateUserRole(id: string, role: UserRole) {
    const user = await this.createUserDto.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    user.role = role;
    return this.createUserDto.save(user);
  }



  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
