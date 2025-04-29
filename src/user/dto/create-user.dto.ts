import { IsEmail, IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';



export class CreateUserDto {



    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    career: string;

}