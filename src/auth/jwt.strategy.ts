
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy ,'jwt') {
  constructor(private userService:UserService,
    private configService:ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWTSECRET'),
      passReqToCallback: true,
    });
  }

  async validate(data: {email}):Promise<User> {
const {email}=data
const user =await this.userService.findEmail(email);
if (!user){
    throw new UnauthorizedException('Login first to access this endpoint', )
}
return user;
  }
}
