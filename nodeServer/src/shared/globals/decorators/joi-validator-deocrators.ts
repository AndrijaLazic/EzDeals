import { JoiRequestValidationError } from "../../globals/helpers/error-handler";
import { Request} from "express";
import { ObjectSchema } from "joi";

type IJoiDecorator = (
	target: any,
	key: string,
	descriptor: PropertyDescriptor
) => void;

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
	return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			const requset: Request = args[0];
			const { error } = await Promise.resolve(schema.validate(requset.body));
			if (error?.details) {
				throw new JoiRequestValidationError(error.details[0].message);
			}
			return originalMethod.apply(this, args);
		};
		return descriptor;
	};
}


export function productSearchValidation(schema: ObjectSchema): IJoiDecorator {
	return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		descriptor.value = async function(...args: any[]) {
			const request: Request = args[0];
			const category = request.params.productCategory;
			const pageNum = request.query.page;
			
			if(category){
				request.body.productCategory=category;
			}
				
			if(pageNum){
				request.body.pageNum=parseInt(request.query.page as unknown as string, 10);
			}

			const { error , value } = await Promise.resolve(schema.validate(request.body));

			if (error?.details) {
				throw new JoiRequestValidationError(error.details[0].message);
			}

			request.body=value;

			return originalMethod.apply(this, args);
		};
		return descriptor;
	};
}
