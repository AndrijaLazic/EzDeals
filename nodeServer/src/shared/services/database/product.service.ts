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


	
}

export const productService: ProductService = new ProductService();
