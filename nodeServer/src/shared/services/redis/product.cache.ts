import { ServerError } from "src/shared/globals/helpers/error-handler";
import { BaseCache, RedisClient } from "./base.cache";
import { IProductDocument } from "src/features/product/interfaces/product.interfaces";


export class ProductCache extends BaseCache {
	constructor(client: RedisClient) {
		super("ProductCache", client);
	}

	/**
	* Save product to cache
	* @param product product you want to save.
	*/
	public async saveProductToCache(
		product: IProductDocument
	): Promise<void> {

		try {
			if (!this.client.isOpen) {
				await this.client.connect();
			}
			await this.client.set(`products:${product._id}`,JSON.stringify(product));
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
		let product:IProductDocument | null=null;
		try {
			if (!this.client.isOpen) {
				await this.client.connect();
			}
			const result=await this.client.get(`products:${productId}`);
			if(result){
				product=JSON.parse(result);
			}
		} catch (error) {
			this.log.error(error);
			throw new ServerError("Server error try again");
		}
		return product;
	}


}
