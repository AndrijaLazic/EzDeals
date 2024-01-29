import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
//import { UserCache } from "src/shared/services/redis/user.cache";
import { productService } from "src/shared/services/database/product.service";
import {
	IProductDocument,
	IProductHistoryDocument,
	IShortProductDocument,
	SearchInfo,
	SortType
} from "../interfaces/product.interfaces";
import {
	CacheTypes,
	RedisFactory
} from "src/shared/services/redis/RedisFactory";
import { ProductCache } from "src/shared/services/redis/product.cache";
import { productSearchValidation } from "src/shared/globals/decorators/joi-validator-deocrators";
import { searchInfoSchema } from "../schemes/search";

const productCache: ProductCache = RedisFactory.getCache<ProductCache>(
	CacheTypes.ProductCache
);

export class ProductControler {
	@productSearchValidation(searchInfoSchema)
	public async getProductsByCategory(
		request: Request,
		response: Response
	): Promise<void> {
		const searchInfo: SearchInfo=request.body;

		let products: IShortProductDocument[] | null =
			await productCache.getShortProductsFromCache(searchInfo);
		let maxPages = 1;

		if (!products) {
			let numberofProductsInCategory: number | null = await productCache.getCategoryNumberOfProducts(searchInfo.productCategory);

			if(!numberofProductsInCategory){
				numberofProductsInCategory=await productService.getNumberOfProductsForCategory(
					searchInfo.productCategory
				);
				productCache.saveCategoryNumberOfProducts(searchInfo.productCategory,numberofProductsInCategory);
			}
				
			maxPages = Math.ceil(
				numberofProductsInCategory / searchInfo.numberOfProducts
			);

			products = await productService.getProductsForCategory(searchInfo);

			if (products) {
				productCache.saveShortProductsToCache(products, searchInfo);
			}
		}

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

		let product: IProductDocument | null =
			await productCache.getProductFromCache(productId);

		if (!product) {
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

		let history: IProductHistoryDocument | null =
			await productCache.getProductHistoryFromCache(historyId);
		
		if (!history) {
			history = await productService.getHistory(
				{
					_id: historyId
				},
				true
			);
			productCache.saveProductHistoryToCache(history!);
		}
		

		response
			.status(HTTP_STATUS.OK)
			.json({ message: "History found", history: history });
	}

	@productSearchValidation(searchInfoSchema)
	public async getProductsBySearch(
		request: Request,
		response: Response
	): Promise<void> {

		const searchInfo: SearchInfo = request.body;

		let products: IShortProductDocument[] | null =
			await productCache.getSearchProductsFromCache(searchInfo);

		let maxPages = 1;

		if (!products) {

			products = await productService.getProductsForSearch(searchInfo);

			let numberofProductsInSearch: number =products.length;
				
			if(numberofProductsInSearch==0)
				numberofProductsInSearch=1;
			maxPages = Math.ceil(
				numberofProductsInSearch / searchInfo.numberOfProducts
			);

			if (products) {
				productCache.saveSearchProductsToCache(products, searchInfo);
			}
		}

		response
			.status(HTTP_STATUS.OK)
			.json({ message: "Products", products: products, maxPages: maxPages });
	}

	@productSearchValidation(searchInfoSchema)
	public async getNewProducts(
		request: Request,
		response: Response
	): Promise<void> {
		const searchInfo: SearchInfo=request.body;

		searchInfo.sortOrder=SortType.ByDateNewerFirst;

		let products: IShortProductDocument[] | null =
			await productCache.getNewProductsFromCache();
		let maxPages = 1;

		if (!products) {
			let numberofProductsInCategory: number | null = await productCache.getCategoryNumberOfProducts("newProducts");

			if(!numberofProductsInCategory){
				numberofProductsInCategory=await productService.getNumberOfNewProducts(searchInfo);
				productCache.saveCategoryNumberOfProducts("newProducts",numberofProductsInCategory);
			}
				
			maxPages = Math.ceil(
				numberofProductsInCategory / searchInfo.numberOfProducts
			);

			products = await productService.getProductsForSearch(searchInfo);

			if (products) {
				productCache.saveNewProductsToCache(products.slice(0,searchInfo.numberOfProducts));
			}
		}

		response
			.status(HTTP_STATUS.OK)
			.json({ message: "Products", products: products.slice(0,searchInfo.numberOfProducts), maxPages: maxPages });
	}
}
