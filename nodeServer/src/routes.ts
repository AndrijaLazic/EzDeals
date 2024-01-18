import { Application } from "express";
import { authRoutes } from "./features/auth/routes/authRoutes";
import { productRoutes } from "./features/product/routes/ProductRoutes";

const BASE_PATH = "/api";
const BASE_SAFE_PATH = "/api/safe";

export default (app: Application) => {
	const routes = () => {
		app.use(BASE_PATH, authRoutes.routes());
		app.use(BASE_SAFE_PATH, authRoutes.safeRoutes());
		app.use(BASE_PATH, productRoutes.routes());
	};
	routes();
};




