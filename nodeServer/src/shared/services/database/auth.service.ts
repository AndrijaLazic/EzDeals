import { IAuthDocument } from "src/features/auth/interfaces/auth.interface";
import { AuthModel } from "src/features/auth/models/auth.schema";

class AuthService {
	public async getUserByUsernameOrEmail(
		username: string,
		email: string
	): Promise<IAuthDocument> {
		const query = {
			$or: [{ username: username }, { email: email }]
		};

		const user: IAuthDocument = (await AuthModel.findOne(
			query
		).exec()) as IAuthDocument;
		return user;
	}
}

export const authService: AuthService = new AuthService();
