import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/guards/role.guards';
import { Roles } from 'src/auth/guards/role';
import { UserRole } from './enum/user.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    
    return this.userService.addUser(createUserDto);
  }

@UseGuards(RoleGuard)
@Roles('admin')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

@UseGuards(RoleGuard)
// @Roles('admin')
  @Get('test')
  test() {
    return {
      test: 'test'
    }
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('role') role:UserRole) {
    return this.userService.updateUserRole(id, role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
