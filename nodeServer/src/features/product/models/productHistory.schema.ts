import { model, Model, Schema } from "mongoose";

import { IProductHistoryDocument } from "../interfaces/product.interfaces";

const productHistorySchema: Schema = new Schema({
	history: { type: [] }
});

export const ProductHistoryModel: Model<IProductHistoryDocument> =
	model<IProductHistoryDocument>(
		"productHistory",
		productHistorySchema,
		"productHistory"
	);
