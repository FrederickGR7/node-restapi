import { NextFunction, Request, Response } from 'express';
import { errorResponse } from './response.handler';
import jwt from 'jsonwebtoken';
import { config } from '../config/env-config';
import { userService } from '../services/user.service';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['x-access-token'] as string;

        if (!token)
            res.status(401).send(errorResponse("No Token provided"));

        const decoded = jwt.verify(token, config.secret) as any;

        let user = await userService.findOne(decoded.id);
        if (!user) 
            res.status(401).send(errorResponse("No valid Token"));
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send(errorResponse(error, "Token Error"));
    }    

}

