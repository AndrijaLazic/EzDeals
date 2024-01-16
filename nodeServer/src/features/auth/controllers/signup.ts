import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { joiValidation } from "src/shared/globals/decorators/joi-validator-deocrators";
import { signupSchema } from "../schemes/signup";
import { IAuthDocument, ISignUpData } from "../interfaces/auth.interface";
import { authService } from "src/shared/services/database/auth.service";
import { BadRequestError } from "src/shared/globals/helpers/error-handler";
import HTTP_STATUS from "http-status-codes";

export class SignUp {
	@joiValidation(signupSchema)
	public async createUser(
		request: Request,
		response: Response
	): Promise<void> {
		const { username, email, password, avatarImage } = request.body;
		const checkIfUserExist: IAuthDocument =
			await authService.getUserByUsernameOrEmail(username, email);

		if (checkIfUserExist) {
			throw new BadRequestError("User already exists");
		}

		const authObjectId: ObjectId = new ObjectId();

		const authData: IAuthDocument = SignUp.prototype.signupData({
			_id: authObjectId,
			username,
			email,
			password
		});
		response
			.status(HTTP_STATUS.CREATED)
			.json({ message: "User created successfully", authData });
	}

	private signupData(data: ISignUpData): IAuthDocument {
		const { _id, username, email, password } = data;
		return {
			_id,
			username,
			email,
			password,
			createdAt: new Date()
		} as unknown as IAuthDocument;
	}
}
