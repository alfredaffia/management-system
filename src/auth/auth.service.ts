import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from 'src/user/dto/login.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
         private jwtService: JwtService,
    
    ) { }

    
    // async validateUser(
    //     email: string, 
    //     password: string,)
    //      {
    //     const user = await this.userService.findEmail(email);
    //     if (user && user.password === password) {
    //         return user;
    //     }
    //     return null
    // }

    

async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findEmail( email );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await argon2.verify(user.password, loginDto.password);
    // const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
        throw new HttpException('invalid password',404)
    }
    const payload = { email: 'user.email', sub: 'user.id' };
    return {

     userId: user.id,
     email: user.email,
      role: user.role,
      Name:user.firstName,
        access_token: this.jwtService.sign(payload)
    }
  }
// async login(login: CreateUserDto){
//     const{password,email} =login
//     if(!login){
//        throw new HttpException(' no account found',404)
//     }
    
//     const user = await this.userService.findEmail(email)
//     if(!user){
//         throw new HttpException('input valid email',404)
//     }
//      // Check if user is blocked
//     // if (user.isBlocked) {
//     //     throw new UnauthorizedException('User is blocked'); 
//     //   }
//       // Check if password is correct
//     const isMatch = await bcrypt.compare(password, user.password)
//     if(!isMatch){
//         throw new HttpException('invalid password',404)
//     }
//     const payload = { email: 'user.email', sub: 'user.id' };
//     return {
//      userId: user.id,
//      email: user.email,
//         access_token: this.jwtService.sign(payload)
//     }
// }

}
