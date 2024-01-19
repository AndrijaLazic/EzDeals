import { Application } from "express";
import { authRoutes } from "./features/auth/routes/authRoutes";
import { productRoutes } from "./features/product/routes/ProductRoutes";

const BASE_PATH = "/api";

export default (app: Application) => {
	const routes = () => {
		app.use(BASE_PATH, authRoutes.routes());
		app.use(BASE_PATH, productRoutes.routes());
	};
	routes();
};
