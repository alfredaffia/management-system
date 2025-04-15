import { Column, Entity, PrimaryGeneratedColumn ,BeforeInsert} from "typeorm";
import { UserRole } from "../enum/user.enum";
// import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
     this.password = await argon2.hash(this.password);
    }

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.user
    })
    role: UserRole;
}
