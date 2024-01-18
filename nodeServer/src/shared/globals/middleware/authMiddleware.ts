import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../helpers/error-handler";
import JWT from "jsonwebtoken";
import { config } from "src/config";

export class AuthMiddleware{
	static authenticateToken(req:Request, res:Response, next:NextFunction) {
		const authHeader = req.headers.authorization;
		
		const token = authHeader && authHeader.split(' ')[1];
		
		if (!token) {
			throw new NotAuthorizedError("No token found");
		}
		
		try{
			JWT.verify(token,config.JWT_SECRET_KEY!);
		}
		catch(error){
			throw new NotAuthorizedError("Token not valid");
		}
		next();
	}
}


