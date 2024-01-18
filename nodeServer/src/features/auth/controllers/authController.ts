import { Request, Response } from "express";
import { joiValidation } from "src/shared/globals/decorators/joi-validator-deocrators";
import { signupSchema } from "../schemes/signup";
import { authService } from "src/shared/services/database/auth.service";
import { BadRequestError } from "src/shared/globals/helpers/error-handler";
import HTTP_STATUS from "http-status-codes";
import { UserCache } from "src/shared/services/redis/user.cache";
import { ISignUpPayload, IUserDocument, IUserInfoDocument } from "src/features/user/interfaces/user.interfaces";
import { Helpers } from "src/shared/globals/helpers/helpers";
import { loginSchema } from "../schemes/login";
import JWT from "jsonwebtoken";
import { config } from "src/config";

const userCache:UserCache=new UserCache();

export class AuthController {
	@joiValidation(signupSchema)
	public async createUser(
		request: Request,
		response: Response
	): Promise<void> {
		const { username, email} = request.body;
		const checkIfUserExist: IUserInfoDocument =
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


	@joiValidation(loginSchema)
	public async loginUser(
		request: Request,
		response: Response
	): Promise<void> {
		const { usernameOrEmail,password} = request.body;
	


		const user=await authService.getUser(usernameOrEmail,password);
		const userJWT=AuthController.prototype.loginToken(user);
		
		
		response
			.status(HTTP_STATUS.OK)
			.json({ message: "Succesfull login", token:userJWT });
	}

	private loginToken(data:IUserDocument):string{

		return JWT.sign({
				_id:data._id,
				email:data.email,
				username:data.username,
				profilePicture:data.profilePicture,
				createdAt:data.createdAt,
				honorValue:data.honorValue,
				quote:data.quote
			},
			config.JWT_SECRET_KEY!,
			config.JWT_OPTIONS
		);
	}

	public async safe(
		request: Request,
		response: Response
	):Promise<void>{
		response
			.status(HTTP_STATUS.OK)
			.json({ message: "Succesfull safe"});
	}
}
