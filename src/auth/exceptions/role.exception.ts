import { ForbiddenException } from "@nestjs/common";


export class forbiddenRoleException extends ForbiddenException{
    constructor(role:string){
        super(`forbidden ${role}`)
    }
}