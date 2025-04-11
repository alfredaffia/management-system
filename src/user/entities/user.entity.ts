import { Column, Entity, PrimaryGeneratedColumn ,BeforeInsert} from "typeorm";
import { UserRole } from "../enum/user.enum";
import * as bcrypt from 'bcryptjs';

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
     this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.user
    })
    role: UserRole;
}
