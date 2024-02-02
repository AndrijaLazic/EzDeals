import { config } from "src/config";
import {
	IProductDocument,
	IProductHistoryDocument,
	IShortProductDocument,
	SearchInfo
} from "src/features/product/interfaces/product.interfaces";
import { ProductCategories } from "src/features/product/models/product.schema";
import { ProductHistoryModel } from "src/features/product/models/productHistory.schema";
import { DatabaseError } from "src/shared/globals/helpers/error-handler";
import { Logger } from "winston";

const log: Logger = config.createLogger("productService");

class ProductService {
	/**
	 * Get products from category
	 * @param searchInfo info used in a search
	 * @param jsonFormat if false return products in Document format
	 * @returns Promise<IShortProductDocument[]> 
	 */
	public async getProductsForCategory(
		searchInfo: SearchInfo,
		jsonFormat: boolean = true
	): Promise<IShortProductDocument[]> {
		let products: IShortProductDocument[];

		const sortParameter=ProductCategories.getSortParameter(searchInfo.sortOrder);

		if (jsonFormat) {
			products = await ProductCategories.getCategory(
				searchInfo.productCategory
			)
				.find({}, ["name", "image", "currentBestPrice","primaryCategory"])
				.sort(sortParameter)
				.skip((searchInfo.pageNum - 1) * searchInfo.numberOfProducts)
				.limit(searchInfo.numberOfProducts)
				.lean()
				.exec();
			return products;
		}

		products = await ProductCategories.getCategory(searchInfo.productCategory)
			.find({}, ["name", "image", "currentBestPrice","primaryCategory"])
			.sort(sortParameter)
			.skip((searchInfo.pageNum - 1) * searchInfo.numberOfProducts)
			.limit(searchInfo.numberOfProducts)
			.exec();
		return products;
	}

	/**
	 * Get number of products in chosen category
	 * !!! This function is expensive and should not be used often !!!
	 * @param category chosen category of products
	 * @returns number
	 */
	public async getNumberOfProductsForCategory(
		category: string
	): Promise<number> {
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


	/**
	 * Get products from search
	 * @param searchInfo info used in a search
	 * @param jsonFormat if false return products in Document format
	 * @returns Promise<IShortProductDocument[]> 
	 */
	public async getProductsForSearch(
		searchInfo: SearchInfo,
		jsonFormat: boolean = true
	): Promise<IShortProductDocument[]> {
		let products: IShortProductDocument[]=[];

		const allCategories= await ProductCategories.getAllCategories();
		let resultProducts: IShortProductDocument[] =[];
		const numOfCategories=allCategories.length;

		const keywordsToSearch:string[]=searchInfo.searchString.trim().split(" ");

		const keywordsToSearchLength=keywordsToSearch.length;
		let searchString:string="";
		for(let i=0;i<keywordsToSearchLength;i++){
			searchString=searchString+"(?=.*"+keywordsToSearch[i]+")";
		}
		const regexExpression=new RegExp(searchString,"i");

		const sortParameter=ProductCategories.getSortParameter(searchInfo.sortOrder);

		let nameFilter={};
		if(searchString){
			nameFilter={
				name:{
					$regex:regexExpression
				}
			};
		}

		if (jsonFormat) {

			for(let i=0;i<numOfCategories;i++){
				resultProducts=await allCategories[i]
					.find(nameFilter, ["name", "image", "currentBestPrice","dateAdded","primaryCategory"])
					.sort(sortParameter)
					.skip((searchInfo.pageNum - 1) * searchInfo.numberOfProducts)
					.limit(searchInfo.numberOfProducts)
					.lean() //
					.exec();
				products=products.concat(resultProducts);
			}
			products=ProductCategories.sortProducts(products,searchInfo.sortOrder);
			return products;
		}

		for(let i=0;i<numOfCategories;i++){
			resultProducts=await allCategories[i]
				.find({
					name:{
						$regex:regexExpression
					}
				}, ["name", "image", "currentBestPrice","dateAdded","primaryCategory"])
				.sort(sortParameter)
				.skip((searchInfo.pageNum - 1) * searchInfo.numberOfProducts)
				.limit(searchInfo.numberOfProducts)
				.exec();
			products=products.concat(resultProducts);
		}
		products=ProductCategories.sortProducts(products,searchInfo.sortOrder);
		return products;
	}


	/**
	 * Get number of new products 
	 * !!! This function is expensive and should not be used often !!!
	 * @param searchInfo info used in a search
	 * @returns number
	 */
	public async getNumberOfNewProducts(
		searchInfo: SearchInfo
	): Promise<number> {
		let numOfNewProducts=0;

		const allCategories= await ProductCategories.getAllCategories();
		let resultProducts=0;
		const numOfCategories=allCategories.length;

		const currentTime=new Date(Date.now() - 24*60*60 * 1000);
		const sortParameter=ProductCategories.getSortParameter(searchInfo.sortOrder);

		for(let i=0;i<numOfCategories;i++){
			resultProducts=await allCategories[i]
				.find(
					{"dateAdded":{$gt:currentTime}}, 
					["name", "image", "currentBestPrice","primaryCategory"]
				)
				.sort(sortParameter)
				.lean() //
				.countDocuments({})
				.exec();
			numOfNewProducts=numOfNewProducts+resultProducts;
			
		}
		return numOfNewProducts;
	}

}

export const productService: ProductService = new ProductService();
