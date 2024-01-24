import Joi, { ObjectSchema } from "joi";
import { SortType } from "../interfaces/product.interfaces";
import { config } from "src/config";

const searchInfoSchema: ObjectSchema = Joi.object().keys({
	pageNum: Joi.number().optional().default(1)
		.custom((value)=>{
			if(value<1)
				value=1;
			return value;
		})
		.messages({
			"number.base": "Page number must be of type number"
		}),

	sortOrder: Joi.string().optional().default(SortType.ByPriceAcending)
		.custom((value,helper)=>{
			const sortOrderString=value as unknown as SortType;
			if (!(Object.values(SortType).includes(sortOrderString))) {
				helper.error(`Order: ${value} does not exist`);
			}
			return value;
		})
		.messages({
			"string.base": "sortOrder must be of type string",
		}),

	productCategory: Joi.string().allow('').optional()
		.custom((value,helper)=>{
			if(!config.checkIfCategoryExists(value))
				helper.error(`Category: ${value} does not exist`);
			return value;
		})
		.messages({
			"string.base": "productCategory must be of type string"
		}),

	numberOfProducts: Joi.number().optional().default(24)
		.custom((value)=>{
			if(value<1)
				value=24;
			return value;
		})
		.messages({
			"number.base": "numberOfProducts number must be of type number"
		}),

	searchString: Joi.string().allow('').optional()
		.messages({
			"string.base": "searchString must be of type string",
		}),
});

export { searchInfoSchema };
