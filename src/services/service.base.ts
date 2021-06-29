import { BaseRepository } from '../repositories/repository.base';
import { FindManyOptions, ObjectID, FindOneOptions, DeleteResult } from 'typeorm';

export class ServiceBase<T> {
  repository: BaseRepository<T>

  constructor(private type: { new(): BaseRepository<T>; }) {
    this.repository = new type();
  }


  public async findSingle(options: FindOneOptions<T>) {
    const result = await this.repository.findSingle(options);
    return result;
  }

  public async findOne(id: string | number | Date | ObjectID, options?: FindOneOptions<T>): Promise<T | undefined> {
    const result = await this.repository.findOne(id, options);
    return result;

  }

  public async all(options?: FindManyOptions): Promise<T[]> {
    const result = await this.repository.all(options);
    return result;

  }

  public async add(object: T): Promise<T> {
    const result = await this.repository.add(object);
    return result;

  }

  public async delete(id: string | number): Promise<DeleteResult> {

    const result = await this.repository.delete(id);
    return result;

  }

}