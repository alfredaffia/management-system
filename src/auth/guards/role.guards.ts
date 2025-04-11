import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/user.service";
import { forbiddenRoleException } from "../exception/role.exception";


@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly reflector:Reflector, private readonly userService: UserService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Ensure reflector is properly injected
        const roles =this.reflector.get<string[]>('roles' , context.getHandler());

        if(!roles) return true; // if no roles are assigned allow access

        const request = context.switchToHttp().getRequest();

        if(request?.user){
            const headers =request.headers
            const user =await this.userService.user(headers);//await user details
        if(!user || roles.includes(user.role)){
            throw new forbiddenRoleException(roles.join(' or '))
        }

        return true;
        }
        return false
    }
} 