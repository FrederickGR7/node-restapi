import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user';
import { userService } from '../services/user.service';
import * as reqResponse from '../utils/response.handler';
import { comparePassword, encryptPassword } from '../utils/password.handlers';
import jwt from 'jsonwebtoken';
import { config } from '../config/env-config';


export const getUsers = async (
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
      const users = await userService.all({skip, take});
      if (users.length == 0)
        return res.status(200).send(reqResponse.successResponse(users, "User entity is empty",));

      return res.status(200).send(reqResponse.successResponse(users, "User Data",));
    } catch (error) {
      console.error(error);
			return res.status(503).send(reqResponse.errorResponse(error));
    }
    
  };
  
  export const getUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    
    if (!parseInt(req.params.id))
      return res.status(400).send(reqResponse.errorResponse(400, "Bad request"));

    try {
      const user = await userService.findOne(req.params.id);
      if (!user)
        return res.status(200).send(reqResponse.successResponse(user, "User not found"));

      return res.status(200).send(reqResponse.successResponse(user, "The user found" ));
    } catch (error) {
      console.error(error);
			return res.status(503).send(reqResponse.errorResponse(error));
    }
    
  };
  
  export const createUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    try {
      let user = new User();
      Object.assign(user, req.body)
      if (!req.body.roles)
        user.roles = [config.roles[0]];

      user.password = await encryptPassword(user.password);
      const userCreated = await userService.add(user);
      const token = jwt.sign({
        id: userCreated.id 
      }, config.secret, {
        expiresIn: 28800 // 8 hours
      })
      return res.status(201).send(reqResponse.successResponse({userCreated, token}, "User created"));
    } catch (error) {
      console.error(error);
			return res.status(503).send(reqResponse.errorResponse(error));
    }
    
  };
  
  export const updateUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      if (!parseInt(req.params.id))
        return res.status(400).send(reqResponse.errorResponse(400, "Bad request"));

      const user = await userService.findOne(req.params.id);
      if (user) {
        getRepository(User).merge(user, req.body);
        const result = await userService.add(user);
        return res.status(200).send(reqResponse.successResponse(result, "User updated"));
      } else {
        return res.status(400).send(reqResponse.errorResponse(400, "Bad request"));
      }
    } catch (error) {
      console.error(error);
			return res.status(503).send(reqResponse.errorResponse(error));
    }

  };
  
  export const deleteUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    try {
      if (!parseInt(req.params.id))
        return res.status(400).send(reqResponse.errorResponse(400, "Bad request"));

      const result = await userService.delete(req.params.id);
      return res.status(200).send(reqResponse.successResponse(result, "User deleted"));
    } catch (error) {
      console.log(error);
      return res.status(503).send(reqResponse.errorResponse(error));
    }
    
};

export const logging = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let user = await userService.findSingle(
      {where: {email: req.body.email}});

    if (user) {
      let matchPassword = await comparePassword(req.body.password, user.password);
      if (matchPassword) {
        const token = jwt.sign({
          id: user.id 
        }, config.secret, {
          expiresIn: 28800 // 8 hours
        })
        return res.status(200).send(reqResponse.successResponse({user, token}, "User Foud"))
      } else {
        return res.status(400).send(reqResponse.errorResponse({token: null}, "Invalid credentials"));
      }
        
    } else {
      return res.status(503).send(reqResponse.errorResponse({token: null}, "Invalid credentials"));
    }
  } catch (error) {
    console.log(error);
    return res.status(503).send(reqResponse.errorResponse(error));
  }
}