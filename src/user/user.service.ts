import { Injectable , UnauthorizedException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { HttpException , } from '@nestjs/common/exceptions/http.exception';



@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>,
  ) { }
async create(payload: CreateUserDto) {
  const { email,  ...rest} = payload;


  const existingUser = await this.userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new HttpException('Email already in use', 400);
  }

  
  const user = await this.userRepository.save({
    email,
    ...rest,
  });

  return payload
}

  
    async findEmail(email: string) {
      const mail = await this.userRepository.findOneByOrFail({ email })
      if (!mail) {
        throw new UnauthorizedException()
      }
      return mail;
    }
  
    async findAll() {
      return await this.userRepository.find()
    }


  async findOne(id: string) {
   const findUserById= await this.userRepository.findOneBy({ id });
   if (!findUserById) {
    throw new HttpException('User not found', 404);
   }
   return findUserById;
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
