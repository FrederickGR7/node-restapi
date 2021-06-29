import { CreateDateColumn, UpdateDateColumn, Column, BaseEntity } from 'typeorm';

export class CommonEntity extends BaseEntity {

    @CreateDateColumn({nullable: true})
    createdDate: Date
    @Column({type: 'varchar', nullable: true})
    createdBy: string;
    @UpdateDateColumn({nullable: true})
    updatedDate: Date
    @Column({type: 'varchar', nullable: true})
    updatedBy: string;
    @Column({type: 'varchar', nullable: true})
    createdIp: string;
    @Column({type: 'varchar', nullable: true})
    updatedIp: string;
    
}