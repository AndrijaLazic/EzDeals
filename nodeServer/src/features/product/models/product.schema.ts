import { model, Model, Schema } from "mongoose";

import { IProductDocument, IShortProductDocument, SortType } from "../interfaces/product.interfaces";
import { ObjectId } from "mongodb";
import { config } from "src/config";
import { BadRequestError } from "src/shared/globals/helpers/error-handler";

const productSchema: Schema = new Schema({
	name: { type: String, require: true },
	image: { type: String, require: true },
	dateAdded: { type: String, require: true },
	lastScraped: { type: String, default: "" },
	primaryCategory: { type: String, default: "" },
	prices: { type: [] },
	historyID: { type: ObjectId }
});

class productCategories {
	private instances = new Map();

	constructor() {
		for (let i = 0; i < config.PRODUCT_CATEGORIES!.length; i++) {
			const categoryName = config.PRODUCT_CATEGORIES![i];
			const newModel: Model<IProductDocument> = model<IProductDocument>(
				categoryName,
				productSchema,
				categoryName
			);
			this.instances.set(categoryName, newModel);
		}
	}

	public getCategory(category: string): Model<IProductDocument> {
		const selectedCategory = this.instances.get(category);

		if (!selectedCategory)
			throw new BadRequestError("Selected category doesn`t exist");

		return selectedCategory;
	}

	public getAllCategories():Model<IProductDocument>[]{
		return Array.from(this.instances.values());
	}

	public getSortParameter(sort:SortType):any{
		switch(sort) { 
			case SortType.ByPriceAcending: { 
				return {
					currentBestPrice:1
				};
			} 
			case SortType.ByPriceDecending: { 
				return {
					currentBestPrice:-1
				};
			}
			case SortType.ByDateNewerFirst: { 
				return {
					dateAdded:-1
				};
			} 
			case SortType.ByDateOlderFirst: { 
				return {
					dateAdded:1
				};
			} 
			default: { 
				return {
					currentBestPrice:1
				};
			} 
		} 
	}

	public sortProducts(arr:IShortProductDocument[],sort:SortType){
		const arrayLength=arr.length;

		switch(sort) { 
			case SortType.ByPriceAcending: { 
				arr.sort(function(a, b){
					return a.currentBestPrice - b.currentBestPrice;
				});
				return arr;
			} 
			case SortType.ByPriceDecending: { 
				arr.sort(function(a, b){
					return b.currentBestPrice - a.currentBestPrice;
				});
				return arr;
			}
			case SortType.ByDateOlderFirst: { 
				for (let index = 0; index < arrayLength; index++) {
					arr[index].dateAdded=new Date(arr[index].dateAdded);
				}
				arr.sort(function(a, b){
					return (a.dateAdded as Date).getTime() - (b.dateAdded as Date).getTime();
				});

				return arr;
			} 
			case SortType.ByDateNewerFirst: {
				for (let index = 0; index < arrayLength; index++) {
					arr[index].dateAdded=new Date(arr[index].dateAdded);
				}
				arr.sort(function(a, b){
					return ((b.dateAdded as Date).getTime() - (a.dateAdded as Date).getTime());
				});

				return arr;
			} 
			default: { 
				return arr;
			} 
		} 
	}

	// Add other methods or properties as needed
}

export const ProductCategories: productCategories = new productCategories();
