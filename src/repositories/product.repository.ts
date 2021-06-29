import { Product } from "../entities/product";
import { BaseRepository } from "./repository.base";


export class ProductRepository extends BaseRepository<Product> {
    constructor() {
        super(Product);
    }

}