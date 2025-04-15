import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './jwtconstants';

@Module({
    imports: [UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWTSECRET,            
            signOptions: {expiresIn: '30s'},
          }),
    ],
    controllers: [AuthController],
    providers: [AuthService],

})
export class AuthModule {}
