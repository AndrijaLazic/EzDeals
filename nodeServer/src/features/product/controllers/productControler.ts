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
import { config } from "src/config";
import { NotFoundError } from "src/shared/globals/helpers/error-handler";

const productCache: ProductCache = RedisFactory.getCache<ProductCache>(
	CacheTypes.ProductCache
);

export class ProductControler {
	public async getProductsByCategory(
		request: Request,
		response: Response
	): Promise<void> {
		const category = request.params.productCategory;

		if (!config.PRODUCT_CATEGORIES?.includes(category))
			throw new NotFoundError("Category:" + category + " does not exist");

		const page: number =
			parseInt(request.query.page as unknown as string, 10) || 1;

		const numberOfProductsPerPage: number =
			parseInt(
				request.query.numberOfProductsPerPage as unknown as string,
				10
			) || 24;

		let sortOrder: SortType = SortType.ByPriceAcending;

		//Check if sort order is valid
		const sortOrderString = request.query.sortOrder as unknown as SortType;
		if (sortOrderString) {
			if (Object.values(SortType).includes(sortOrderString)) {
				sortOrder = sortOrderString;
			}
		}

		const searchInfo: SearchInfo = {
			productCategory: category,
			pageNum: page,
			numberOfProducts: numberOfProductsPerPage,
			searchString: "",
			sortOrder: sortOrder
		};

		let products: IShortProductDocument[] | null =
			await productCache.getShortProductsFromCache(searchInfo);
		let maxPages = 1;

		if (!products) {
			const numberofProductsInCategory: number =
				await productService.getNumberOfProductsForCategory(
					searchInfo.productCategory
				);
			maxPages = Math.ceil(
				numberofProductsInCategory / numberOfProductsPerPage
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
}
