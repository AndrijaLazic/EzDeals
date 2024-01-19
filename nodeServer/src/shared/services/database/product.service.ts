import { config } from "src/config";
import {
	IProductDocument,
	IShortProductDocument
} from "src/features/product/interfaces/product.interfaces";
import { ProductCategories } from "src/features/product/models/product.schema";
import { DatabaseError } from "src/shared/globals/helpers/error-handler";
import { Logger } from "winston";

const log: Logger = config.createLogger("setupServer");

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
	 * @returns Promise<IProductDocument>
	 */
	public async getProduct(
		category: string,
		filter: Record<string, string>,
		jsonFormat: boolean
	): Promise<IProductDocument | null> {
		try {
			if (jsonFormat) {
				const product: IProductDocument | null =
					await ProductCategories.getCategory(category)
						.findOne(filter)
						.lean() //
						.exec();

				return product;
			}

			const product: IProductDocument | null =
				await ProductCategories.getCategory(category)
					.findOne(filter)
					.exec();

			return product;
		} catch (error) {
			log.error(error);
			throw new DatabaseError("Failed to get requested product");
		}
	}
}

export const productService: ProductService = new ProductService();
