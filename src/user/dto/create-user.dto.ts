import { IsEmail, IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';


export class CreateUserDto {

    // id: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    role: string;

}