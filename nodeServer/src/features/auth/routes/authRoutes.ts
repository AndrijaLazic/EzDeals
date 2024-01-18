import express, { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/authController";
import { NotAuthorizedError } from "src/shared/globals/helpers/error-handler";
import JWT from "jsonwebtoken";
import { config } from "src/config";


class AuthRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.post("/signup", AuthController.prototype.createUser);
		this.router.post("/login", AuthController.prototype.loginUser);
		return this.router;
	}

	public safeRoutes():Router{
		this.router.post("/safe",this.authenticateToken, AuthController.prototype.safe);
		return this.router;
	}

	private authenticateToken(req:Request, res:Response, next:NextFunction) {
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




export const authRoutes: AuthRoutes = new AuthRoutes();
