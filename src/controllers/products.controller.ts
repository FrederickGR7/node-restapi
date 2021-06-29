import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/product';
import { productService } from '../services/product.service';
import * as reqResponse from '../utils/response.handler';


export const getProducts = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    let { page, rowsByPage } = req.body;
    if (!page)
      page = 1;
    if (!rowsByPage)
      rowsByPage = 50;

    let previousPage = (page - 1) < 0 ? 0 : page - 1;
    let skip = rowsByPage * previousPage;
    let take = rowsByPage;
    
    try {
      const products = await productService.all({skip, take});
      if (products.length == 0)
        return res.status(200).send(reqResponse.successResponse(products, "Product entity is empty",));

      return res.status(200).send(reqResponse.successResponse(products, "Product Data",));
    } catch (error) {
      console.error(error);
			return res.status(503).send(reqResponse.errorResponse(error));
    }
    
  };
  
  export const getProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    
    if (!parseInt(req.params.id))
      return res.status(400).send(reqResponse.errorResponse(400, "Bad request"));

    try {
      const product = await productService.findOne(req.params.id);
      if (!product)
        return res.status(200).send(reqResponse.successResponse(product, "Product not found"));

      return res.status(200).send(reqResponse.successResponse(product, "The product found" ));
    } catch (error) {
      console.error(error);
			return res.status(503).send(reqResponse.errorResponse(error));
    }
    
  };
  
  export const createProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    try {
      const product = await productService.add(req.body);
      return res.status(201).send(reqResponse.successResponse(product, "Product created"));
    } catch (error) {
      console.error(error);
			return res.status(503).send(reqResponse.errorResponse(error));
    }
    
  };
  
  export const updateProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      if (!parseInt(req.params.id))
        return res.status(400).send(reqResponse.errorResponse(400, "Bad request"));

      const product = await productService.findOne(req.params.id);
      if (product) {
        getRepository(Product).merge(product, req.body);
        const result = await productService.add(product);
        return res.status(200).send(reqResponse.successResponse(result, "Product updated"));
      } else {
        return res.status(400).send(reqResponse.errorResponse(400, "Bad request"));
      }
    } catch (error) {
      console.error(error);
			return res.status(503).send(reqResponse.errorResponse(error));
    }
    
  
    return res.json({msg: 'Not product found'});
  };
  
  export const deleteProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    try {
      if (!parseInt(req.params.id))
        return res.status(400).send(reqResponse.errorResponse(400, "Bad request"));

      const result = await productService.delete(req.params.id);
      return res.status(200).send(reqResponse.successResponse(result, "Product deleted"));
    } catch (error) {
      console.log(error);
      return res.status(503).send(reqResponse.errorResponse(error));
    }
    
};