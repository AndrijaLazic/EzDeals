import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
//import { UserCache } from "src/shared/services/redis/user.cache";
import { productService } from "src/shared/services/database/product.service";
import { IProductDocument } from "../interfaces/product.interfaces";

//const userCache:UserCache=new UserCache();

export class ProductControler {
	public async getProducts(
		request: Request,
		response: Response
	): Promise<void> {
		const category = request.params.productCategory;
		const products:IProductDocument[] = await productService.getProducts(category, 1, 24);


		response
			.status(HTTP_STATUS.OK)
			.json({ message: "Products", products: products });
	}
}
