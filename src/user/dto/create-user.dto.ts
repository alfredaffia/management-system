import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    firstName: string;

    @IsNotEmpty()
    @IsEmail()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}