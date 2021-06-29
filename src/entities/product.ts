import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../utils/common.entity';

@Entity()
export class Product extends CommonEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    category: string;

    @Column({type: 'decimal'})
    price: number;

    @Column({type: 'varchar'})
    imgURL: string;

}