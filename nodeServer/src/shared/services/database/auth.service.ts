import { IAuthDocument, ISignUpPayload } from "src/features/auth/interfaces/auth.interface";
import { IUserDocument } from "src/features/user/interfaces/user.interfaces";
import { UserModel } from "src/features/user/models/user.schema";


class AuthService {
	public async getUserByUsernameOrEmail(
		username: string,
		email: string
	): Promise<IAuthDocument> {
		const query = {
			$or: [{ username: username }, { email: email }]
		};

		const user: IAuthDocument = (await UserModel.findOne(
			query
		).exec()) as IAuthDocument;
		return user;
	}

	public async addNewUser(userData:ISignUpPayload):Promise<IUserDocument>{
		const {username, email, password, profilePicture,quote} = userData;
		const userDocument={
			username,
			email,
			password,
			profilePicture,
			quote
		};
		const newUser=new UserModel(userDocument);
		return newUser.save() as unknown as IUserDocument;
		
	}
}

export const authService: AuthService = new AuthService();
