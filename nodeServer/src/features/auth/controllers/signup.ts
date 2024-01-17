import { Request, Response } from "express";
import { joiValidation } from "src/shared/globals/decorators/joi-validator-deocrators";
import { signupSchema } from "../schemes/signup";
import { IAuthDocument, ISignUpPayload } from "../interfaces/auth.interface";
import { authService } from "src/shared/services/database/auth.service";
import { BadRequestError } from "src/shared/globals/helpers/error-handler";
import HTTP_STATUS from "http-status-codes";
import { UserCache } from "src/shared/services/redis/user.cache";
import { IUserDocument } from "src/features/user/interfaces/user.interfaces";
import { Helpers } from "src/shared/globals/helpers/helpers";

const userCache:UserCache=new UserCache();

export class SignUp {
	@joiValidation(signupSchema)
	public async createUser(
		request: Request,
		response: Response
	): Promise<void> {
		const { username, email} = request.body;
		const checkIfUserExist: IAuthDocument =
			await authService.getUserByUsernameOrEmail(username, email);

		if (checkIfUserExist) {
			if(username===checkIfUserExist.username)
				throw new BadRequestError("User with that username already exists");
			throw new BadRequestError("User with that email already exists");
		}

		const newUser:IUserDocument=await authService.addNewUser(request.body as ISignUpPayload);
		if(!newUser){
			throw new BadRequestError("Failed to create new user");
		}

		
		const uId=`${Helpers.generateRandomIntegers(12)}`;
		
		//Add user to redis cache
		await userCache.saveUserToCache(`${newUser._id}`,uId,newUser);


		response
			.status(HTTP_STATUS.CREATED)
			.json({ message: "User created successfully", newUser });
	}
}
