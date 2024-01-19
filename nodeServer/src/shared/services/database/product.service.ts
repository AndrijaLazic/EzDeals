import { IProductDocument } from "src/features/product/interfaces/product.interfaces";
import { ProductCategories } from "src/features/product/models/product.schema";

class ProductService {
	public async getProducts(
		category: string,
		page: number,
		numberOfProductsPerPage:number
	): Promise<IProductDocument[]> {



		const products:IProductDocument[]=await ProductCategories.getCategory(category)
			.find()
			.skip((page-1)*numberOfProductsPerPage)
			.limit(numberOfProductsPerPage)
			.exec();

		return products;
	}



	/**
  * Get number of products in chosen category
  * !!! This function is expensive and should not be used often !!!
  * @param category chosen category of products
  * @returns number
  */
	public async getNumberOfProducts(
		category: string
	): Promise<number> {
		
		const numberofProducts:number=await ProductCategories.getCategory(category)
		.countDocuments({});

		return numberofProducts;
	}
}

export const productService: ProductService = new ProductService();
