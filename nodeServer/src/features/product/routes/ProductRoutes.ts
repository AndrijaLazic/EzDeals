import express, { Router } from "express";

import { ProductControler } from "../controllers/productControler";


class ProductRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.post("/product/:productCategory", ProductControler.prototype.getProducts);
		return this.router;
	}

}


export const productRoutes: ProductRoutes = new ProductRoutes();
