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
		const page:number = parseInt(request.query.page as unknown as string,10) || 1;
		const numberOfProductsPerPage:number = parseInt(request.query.numberOfProductsPerPage as unknown as string,10) || 24;

		const numberofProductsInCategory:number=await productService.getNumberOfProducts(category);
		const maxPages=Math.ceil(numberofProductsInCategory / numberOfProductsPerPage);



		const products:IProductDocument[] = await productService.getProducts(category, page, numberOfProductsPerPage);

		

		response
			.status(HTTP_STATUS.OK)
			.json({ message: "Products", products: products ,maxPages:maxPages});
	}
}
