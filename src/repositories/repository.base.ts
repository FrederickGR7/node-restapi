import { FindManyOptions, ObjectID, FindOneOptions, getRepository, DeleteResult } from 'typeorm';

export class BaseRepository<T> {

  constructor(private type: { new(): T; }) {

  }


  public async all(options?: FindManyOptions): Promise<T[]> {

    const result = getRepository(this.type).find(options || {});
    return result;

  }

  public async findOne(id: string | number | Date | ObjectID, options?: FindOneOptions<T>): Promise<T | undefined>  {

    const result = await getRepository(this.type).findOne(id, options || {});
    return result;

  }

  public async findSingle(options: FindOneOptions<T>): Promise<T | undefined> {

    let result = await getRepository(this.type).findOne(options);
    return result;

  }


  public async add(entityToSave: T): Promise<T> {

    const entity = await getRepository(this.type).save(entityToSave, {});
    return entity;

  }

  public async delete(id: string | number): Promise<DeleteResult> {

    const result = await getRepository(this.type).delete(id);
    return result;

  }

}