import express, { Router } from "express";
import { AuthController } from "../controllers/authController";

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
}

export const authRoutes: AuthRoutes = new AuthRoutes();
