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

interface defaultFilter{
	$and:any[]
};

function getDefaultFilter(){
	return {
		$and:[
			{
				visibility:true
			}
		]
	} as defaultFilter;
}

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
				.find(getDefaultFilter(), ["name", "image", "currentBestPrice","primaryCategory"])
				.collation({locale: "en_US", numericOrdering: true})
				.sort(sortParameter)
				.skip((searchInfo.pageNum - 1) * searchInfo.numberOfProducts)
				.limit(searchInfo.numberOfProducts)
				.lean()
				.exec();
			return products;
		}

		products = await ProductCategories.getCategory(searchInfo.productCategory)
			.find(getDefaultFilter(), ["name", "image", "currentBestPrice","primaryCategory"])
			.collation({locale: "en_US", numericOrdering: true})
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
		).countDocuments(getDefaultFilter());

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

		const newFilter=getDefaultFilter();
		newFilter.$and.push(filter);

		try {
			if (jsonFormat) {
				product = await ProductCategories.getCategory(category)
					.findOne(newFilter)
					.lean() //
					.exec();
			}

			product = await ProductCategories.getCategory(category)
				.findOne(newFilter)
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
		filter:any={},
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
		const newFilter=getDefaultFilter();
		newFilter.$and.push(nameFilter);
		newFilter.$and.push(filter);

		if (jsonFormat) {

			for(let i=0;i<numOfCategories;i++){
				resultProducts=[];
				resultProducts=await allCategories[i]
					.find(newFilter, ["name", "image", "currentBestPrice","dateAdded","primaryCategory"])
					.collation({locale: "en_US", numericOrdering: true})
					.sort(sortParameter)
					.limit(searchInfo.numberOfProducts*searchInfo.pageNum)
					.lean() //
					.exec();
				products=products.concat(resultProducts);
			}
			
			products=ProductCategories.sortProducts(products,searchInfo.sortOrder);
			return products;
		}

		for(let i=0;i<numOfCategories;i++){
			resultProducts=await allCategories[i]
				.find(
					newFilter
					, ["name", "image", "currentBestPrice","dateAdded","primaryCategory"])
				.collation({locale: "en_US", numericOrdering: true})
				.sort(sortParameter)
				.limit(searchInfo.numberOfProducts*searchInfo.pageNum)
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
		const numOfCategories=allCategories.length;

		const currentTime=(new Date(Date.now() - 23*60*60 * 1000));

		const newFilter=getDefaultFilter();
		newFilter.$and.push({dateAdded:{$gte:new Date(currentTime.toISOString())}});

		for(let i=0;i<numOfCategories;i++){
			let resultProducts=0;
			try {
				resultProducts=await allCategories[i]
				.countDocuments(newFilter)
				.exec();
			} catch (error) {
				log.error(error);
			}
			numOfNewProducts=numOfNewProducts+resultProducts;
		}
		return numOfNewProducts;
	}



	/**
	 * Get number of products in search
	 * !!! This function is expensive and should not be used often !!!
	 * @param searchInfo
	 * @returns number
	 */
	public async getNumberOfProductsForSearch(
		searchInfo: SearchInfo
	): Promise<number> {
		const keywordsToSearch:string[]=searchInfo.searchString.trim().split(" ");
		
		const keywordsToSearchLength=keywordsToSearch.length;
		let searchString:string="";
		for(let i=0;i<keywordsToSearchLength;i++){
			searchString=searchString+"(?=.*"+keywordsToSearch[i]+")";
		}
		const regexExpression=new RegExp(searchString,"i");
		let nameFilter={};
		if(searchString){
			nameFilter={
				name:{
					$regex:regexExpression
				}
			};
		}
		const newFilter=getDefaultFilter();
		newFilter.$and.push(nameFilter);

		const allCategories= await ProductCategories.getAllCategories();
		const numOfCategories=allCategories.length;
		
		let numOfProducts=0;
		for(let i=0;i<numOfCategories;i++){
			let resultProducts=0;
			try {
				resultProducts=await allCategories[i]
				.countDocuments(newFilter)
				.exec();
			} catch (error) {
				log.error(error);
			}
			numOfProducts=numOfProducts+resultProducts;
		}
		return numOfProducts;
	}
}

export const productService: ProductService = new ProductService();
