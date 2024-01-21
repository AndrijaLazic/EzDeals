import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
//import { UserCache } from "src/shared/services/redis/user.cache";
import { productService } from "src/shared/services/database/product.service";
import {
	IProductDocument,
	IProductHistoryDocument,
	IShortProductDocument
} from "../interfaces/product.interfaces";
import {
	CacheTypes,
	RedisFactory
} from "src/shared/services/redis/RedisFactory";
import { ProductCache } from "src/shared/services/redis/product.cache";

const productCache: ProductCache = RedisFactory.getCache<ProductCache>(
	CacheTypes.ProductCache
);

export class ProductControler {
	public async getProducts(
		request: Request,
		response: Response
	): Promise<void> {
		const category = request.params.productCategory;
		const page: number =
			parseInt(request.query.page as unknown as string, 10) || 1;
		const numberOfProductsPerPage: number =
			parseInt(
				request.query.numberOfProductsPerPage as unknown as string,
				10
			) || 24;

		const numberofProductsInCategory: number =
			await productService.getNumberOfProducts(category);
		const maxPages = Math.ceil(
			numberofProductsInCategory / numberOfProductsPerPage
		);

		const products: IShortProductDocument[] =
			await productService.getProductsForSearch(
				category,
				page,
				numberOfProductsPerPage
			);

		response
			.status(HTTP_STATUS.OK)
			.json({ message: "Products", products: products, maxPages: maxPages });
	}

	public async getSingleProduct(
		request: Request,
		response: Response
	): Promise<void> {

		const category = request.params.productCategory;
		const productId = request.params.productId;

		let product: IProductDocument | null=await productCache.getProductFromCache(productId);

		if(!product){
			product = await productService.getProduct(
				category,
				{
					_id: productId
				},
				true
			);
			productCache.saveProductToCache(product!);
		}

		response
			.status(HTTP_STATUS.OK)
			.json({ message: "Product found", product: product });
	}

	public async getProductHistory(
		request: Request,
		response: Response
	): Promise<void> {
		const historyId = request.params.historyId;

		let history: IProductHistoryDocument | null=await productCache.getProductHistoryFromCache(historyId);
		console.log(history);
		if(!history){
			history =
				await productService.getHistory(
					{
						_id: historyId
					},
					true
				);
			productCache.saveProductHistoryToCache(history!);
		}
		console.log(history);

		response
			.status(HTTP_STATUS.OK)
			.json({ message: "History found", history: history });
	}
}
