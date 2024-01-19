import express, { Router } from "express";
import { AuthController } from "../controllers/authController";
import { AuthMiddleware } from "src/shared/globals/middleware/authMiddleware";

class AuthRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.post("/signup", AuthController.prototype.createUser);
		this.router.post("/login", AuthController.prototype.loginUser);
		this.router.post(
			"/safe",
			AuthMiddleware.authenticateToken,
			AuthController.prototype.safe
		);
		return this.router;
	}
}

export const authRoutes: AuthRoutes = new AuthRoutes();
