import { Column, Entity, PrimaryGeneratedColumn ,BeforeInsert} from "typeorm";
import { UserRole } from "../enum/user.enum";


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column({unique:true})
    email:string

    @Column()
    surname:string
}
