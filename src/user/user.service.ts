import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private createUserDto: Repository<User>,
    // private jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existingUser = await this.createUserDto.findOne({ where: { email } });

    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }

    // const payload = { email: 'user.email', sub: 'user.id', username: 'user.username' };

    const add = this.createUserDto.create(createUserDto);

    return {
      userDetails: await this.createUserDto.save(add),
      // access_token: this.jwtService.sign(payload)
    };
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
