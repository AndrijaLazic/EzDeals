import {
	ISignUpPayload,
	IUserDocument,
	IUserInfoDocument
} from "src/features/user/interfaces/user.interfaces";
import { UserModel } from "src/features/user/models/user.schema";
import { BadRequestError } from "src/shared/globals/helpers/error-handler";

class AuthService {
	public async getUserByUsernameOrEmail(
		username: string,
		email: string
	): Promise<IUserInfoDocument> {
		const query = {
			$or: [{ username: username }, { email: email }]
		};

		const user: IUserInfoDocument = (await UserModel.findOne(
			query
		).exec()) as IUserInfoDocument;
		return user;
	}

	public async addNewUser(userData: ISignUpPayload): Promise<IUserDocument> {
		const { username, email, password, profilePicture, quote } = userData;
		const userDocument = {
			username,
			email,
			password,
			profilePicture,
			quote
		};
		const newUser = new UserModel(userDocument);
		return newUser.save() as unknown as IUserDocument;
	}

	public async getUser(
		usernameOrEmail: string,
		password: string
	): Promise<IUserDocument> {
		const query = {
			$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
		};

		const user = (await UserModel.findOne(
			query
		).exec()) as unknown as IUserDocument;

		if (!user) throw new BadRequestError("User does not exist");

		//throws error if password is bad
		user.comparePassword(password);

		return user;
	}
}

export const authService: AuthService = new AuthService();
