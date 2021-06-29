import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../utils/common.entity';
import { Role } from './role';

@Entity()
export class User extends CommonEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', unique: true})
    username: string;

    @Column({type: 'varchar', unique: true})
    email: string;

    @Column({type: 'varchar'})
    password: string;

    @ManyToMany(() => Role, role => role.name, {eager: true})
    @JoinTable()
    roles: Role[];

}