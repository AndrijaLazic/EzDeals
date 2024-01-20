import { config } from "src/config";
import {
	IProductDocument,
	IProductHistoryDocument,
	IShortProductDocument
} from "src/features/product/interfaces/product.interfaces";
import { ProductCategories } from "src/features/product/models/product.schema";
import { ProductHistoryModel } from "src/features/product/models/productHistory.schema";
import { DatabaseError } from "src/shared/globals/helpers/error-handler";
import { Logger } from "winston";

const log: Logger = config.createLogger("productService");

class ProductService {
	/**
	 * Get products in JSON format
	 * @param category chosen category of products
	 * @param page chosen page of products. If it exceeds the maximum page, it will default to the max page. The default value is 1.
	 * @param numberOfProductsPerPage number of products on single page
	 * @returns number
	 */
	public async getProductsForSearch(
		category: string,
		page: number,
		numberOfProductsPerPage: number
	): Promise<IShortProductDocument[]> {
		const products: IShortProductDocument[] =
			await ProductCategories.getCategory(category)
				.find({}, ["name", "image", "currentBestPrice"])
				.skip((page - 1) * numberOfProductsPerPage)
				.limit(numberOfProductsPerPage)
				.lean() //
				.exec();

		return products;
	}

	/**
	 * Get number of products in chosen category
	 * !!! This function is expensive and should not be used often !!!
	 * @param category chosen category of products
	 * @returns number
	 */
	public async getNumberOfProducts(category: string): Promise<number> {
		const numberofProducts: number = await ProductCategories.getCategory(
			category
		).countDocuments({});

		return numberofProducts;
	}

	/**
	 * Get product by using filter.
	 * @param category chosen category of products
	 * @param filter filter used to find wanted product
	 * @param jsonFormat json is much cheaper to get then Document object
	 * @returns Promise<IProductDocument>
	 */
	public async getProduct(
		category: string,
		filter: Record<string, string>,
		jsonFormat: boolean
	): Promise<IProductDocument | null> {
		let product: IProductDocument | null = null;

		try {
			if (jsonFormat) {
				product = await ProductCategories.getCategory(category)
					.findOne(filter)
					.lean() //
					.exec();
			}

			product = await ProductCategories.getCategory(category)
				.findOne(filter)
				.exec();
		} catch (error) {
			log.error(error);
			throw new DatabaseError("Failed to get requested product");
		}

		if (!product) throw new DatabaseError("Requested product does not exist");

		return product;
	}

	/**
	 * Get product history by using filter.
	 * @param filter filter used to find wanted product history
	 * @param jsonFormat json is much cheaper to get then Document object
	 * @returns Promise<IProductDocument>
	 */
	public async getHistory(
		filter: Record<string, string>,
		jsonFormat: boolean
	): Promise<IProductHistoryDocument | null> {
		let history: IProductHistoryDocument | null = null;

		try {
			if (jsonFormat) {
				history = await ProductHistoryModel.findOne(filter)
					.lean() //
					.exec();
			}

			history = await ProductHistoryModel.findOne(filter).exec();
		} catch (error) {
			log.error(error);
			throw new DatabaseError("Failed to get requested product history");
		}

		if (!history) throw new DatabaseError("Requested product does not exist");

		return history;
	}
}

export const productService: ProductService = new ProductService();
