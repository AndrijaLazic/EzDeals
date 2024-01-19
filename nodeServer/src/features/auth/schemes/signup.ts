import Joi, { ObjectSchema } from "joi";

const signupSchema: ObjectSchema = Joi.object().keys({
	username: Joi.string().required().min(4).max(16).messages({
		"string.base": "Username must be of type string",
		"string.min": "Invalid username",
		"string.max": "Invalid username",
		"string.empty": "Username is a required field"
	}),
	password: Joi.string().required().min(4).max(16).messages({
		"string.base": "Password must be of type string",
		"string.min": "Invalid password",
		"string.max": "Invalid password",
		"string.empty": "Password is a required field"
	}),
	email: Joi.string().required().email().messages({
		"string.base": "Email must be of type string",
		"string.email": "Email must be valid",
		"string.empty": "Email is a required field"
	}),
	quote: Joi.string().max(50).messages({
		"string.base": "Quote must be of type string",
		"string.max": "Max quote length is 50"
	})
});

export { signupSchema };
