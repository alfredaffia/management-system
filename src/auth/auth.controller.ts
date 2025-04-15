import { Body, Controller,  Post } from '@nestjs/common';
import { LoginDto } from '../user/dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Controller('auth')
export class AuthController {
       constructor(
              private AuthService: AuthService
       ) { }
       @Post('/login')
       login(@Body() loginDto: LoginDto) {
         return this.AuthService.login(loginDto);
       };

}
