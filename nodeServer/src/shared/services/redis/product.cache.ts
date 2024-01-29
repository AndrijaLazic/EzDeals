import { ServerError } from "src/shared/globals/helpers/error-handler";
import { BaseCache, RedisClient } from "./base.cache";
import {
	IProductDocument,
	IProductHistoryDocument,
	IShortProductDocument,
	SearchInfo
} from "src/features/product/interfaces/product.interfaces";

export class ProductCache extends BaseCache {
	constructor(client: RedisClient) {
		super("ProductCache", client);
	}

	/**
	 * Save product to cache
	 * @param product product you want to save.
	 */
	public async saveProductToCache(product: IProductDocument): Promise<void> {
		try {
			await this.client.set(
				`products:${product._id}`,
				JSON.stringify(product)
			);
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
	}

	/**
	 * Get product from cache
	 * @param productId Id of product you want to get
	 */
	public async getProductFromCache(
		productId: string
	): Promise<IProductDocument | null> {
		let product: IProductDocument | null = null;
		try {
			const result = await this.client.get(`products:${productId}`);
			if (result) {
				product = JSON.parse(result);
			}
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
		return product;
	}

	/**
	 * Save product history to cache
	 * @param productHistory product history you want to save.
	 */
	public async saveProductHistoryToCache(
		productHistory: IProductHistoryDocument
	): Promise<void> {
		try {
			await this.client.set(
				`productsHistory:${productHistory._id}`,
				JSON.stringify(productHistory)
			);
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
	}

	/**
	 * Get product history from cache
	 * @param historyId Id of product you want to get
	 */
	public async getProductHistoryFromCache(
		historyId: string
	): Promise<IProductHistoryDocument | null> {
		let productHistory: IProductHistoryDocument | null = null;
		try {
			const result = await this.client.get(`productsHistory:${historyId}`);
			if (result) {
				productHistory = JSON.parse(result);
			}
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
		return productHistory;
	}

	/**
	 * Save short products to cache
	 * @param products products you want to save.
	 * @param searchInfo info about searched products.
	 */
	public async saveShortProductsToCache(
		products: IShortProductDocument[],
		searchInfo: SearchInfo
	): Promise<void> {
		try {
			await this.client.set(
				`shortProducts:${searchInfo.productCategory}:${searchInfo.sortOrder}:${searchInfo.pageNum}`,
				JSON.stringify(products)
			);
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
	}

	/**
	 * Get short products from cache
	 * @param searchInfo information about the search
	 */
	public async getShortProductsFromCache(
		searchInfo: SearchInfo
	): Promise<IShortProductDocument[] | null> {
		let products: IShortProductDocument[] | null = null;
		try {
			const result = await this.client.get(
				`shortProducts:${searchInfo.productCategory}:${searchInfo.sortOrder}:${searchInfo.pageNum}`
			);
			if (result) {
				products = JSON.parse(result);
			}
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
		return products;
	}

	/**
	 * Save search products  to cache
	 * @param products products you want to save.
	 * @param searchInfo info about searched products.
	 */
	public async saveSearchProductsToCache(
		products: IShortProductDocument[],
		searchInfo: SearchInfo
	): Promise<void> {
		try {
			await this.client.set(
				`shortProducts:${searchInfo.searchString}:${searchInfo.sortOrder}:${searchInfo.pageNum}`,
				JSON.stringify(products)
			);
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
	}

	/**
	 * Get short products from cache
	 * @param searchInfo information about the search
	 */
	public async getSearchProductsFromCache(
		searchInfo: SearchInfo
	): Promise<IShortProductDocument[] | null> {
		let products: IShortProductDocument[] | null = null;
		try {
			const result = await this.client.get(
				`shortProducts:${searchInfo.searchString}:${searchInfo.sortOrder}:${searchInfo.pageNum}`
			);
			if (result) {
				products = JSON.parse(result);
			}
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
		return products;
	}

	/**
	 * Save number of products in selected category to cache
	 * @param category category you want to save
	 * @param numberOfProducts number of products you want to save
	 */
	public async saveCategoryNumberOfProducts(
		category:string,
		numberOfProducts:number
	): Promise<void> {
		try {
			await this.client.set(
				`${category}:numberOfProducts`,
				numberOfProducts
			);
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
	}

	/**
	 * Get number of products in selected category from cache
	 * @param category category you want to save
	 */
	public async getCategoryNumberOfProducts(
		category:string,
	): Promise<number | null> {
		let numberOfProducts: number | null = null;
		try {
			const result = await this.client.get(`${category}:numberOfProducts`);
			if (result) {
				numberOfProducts = parseInt(result, 10);
			}
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
		return numberOfProducts;
	}

	/**
	 * Save newProductsToCache(products that were added in last 24h)
	 * @param products products you want to save.
	 */
	public async saveNewProductsToCache(
		products: IShortProductDocument[]
	): Promise<void> {
		try {
			await this.client.set(
				`newProducts`,
				JSON.stringify(products)
			);
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
	}

	/**
	 * Get new products from cache (products that were added in last 24h)
	 * @param searchInfo information about the search
	 */
	public async getNewProductsFromCache(
	): Promise<IShortProductDocument[] | null> {
		let products: IShortProductDocument[] | null = null;
		try {
			const result = await this.client.get(
				`newProducts`
			);
			if (result) {
				products = JSON.parse(result);
			}
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
		return products;
	}

}
