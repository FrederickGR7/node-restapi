import { NextFunction, Request, Response } from 'express';
import { getRepository, In } from 'typeorm';
import { config } from '../config/env-config';
import { Role } from '../entities/role';
import { User } from '../entities/user';
import { userService } from '../services/user.service';
import { errorResponse } from './response.handler';
import jwt from 'jsonwebtoken';

export const verifyRoles = async () => {

    let count = await getRepository(Role).find();

    if (count.length == 0)
        await getRepository(Role).save(config.roles);

}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decoded = jwt.verify(req.headers['x-access-token'] as string, config.secret) as any;
        const user = await userService.findOne(decoded.id) as User;
        let userRoles = user.roles.map(role => role.name);
        const roles = await getRepository(Role).find({name: In(userRoles)});
    
        if(!roles.find(item => item.name === 'admin'))
           return res.status(401).send(errorResponse("Authentication Error"));
        
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).send(errorResponse(error, "Authentication Error"));
    }

}