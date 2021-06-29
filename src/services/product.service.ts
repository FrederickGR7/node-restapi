import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product.repository";
import { ServiceBase } from "./service.base";

class ProductsService extends ServiceBase<Product> {
    constructor() {
        super(ProductRepository)
    }
}

export const productService = new ProductsService();