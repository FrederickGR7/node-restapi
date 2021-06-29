import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';


@Entity()
export class Role {

    @PrimaryColumn({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    description: string;

    @ManyToMany(() => User, user => user.roles)
    user: User[]
}