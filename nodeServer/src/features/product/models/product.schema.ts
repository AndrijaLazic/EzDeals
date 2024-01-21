import { model, Model, Schema } from "mongoose";

import { IProductDocument } from "../interfaces/product.interfaces";
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

	// Add other methods or properties as needed
}

export const ProductCategories: productCategories = new productCategories();
