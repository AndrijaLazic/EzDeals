import express, { Router } from "express";

import { ProductControler } from "../controllers/productControler";

class ProductRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		this.router.get(
			"/product/newProducts",
			ProductControler.prototype.getNewProducts
		);

		this.router.get(
			"/product/history/:historyId",
			ProductControler.prototype.getProductHistory
		);

		this.router.get(
			"/product/search",
			ProductControler.prototype.getProductsBySearch
		);

		this.router.get(
			"/product/:productCategory",
			ProductControler.prototype.getProductsByCategory
		);
		
		this.router.get(
			"/product/:productCategory/:productId",
			ProductControler.prototype.getSingleProduct
		);
		

		return this.router;
	}
}

export const productRoutes: ProductRoutes = new ProductRoutes();
