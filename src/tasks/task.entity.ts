import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @ManyToOne((type)=> User, (user) => user.tasks, {eager:false})
    @Exclude({ toPlainOnly : true})
    user:User;

}