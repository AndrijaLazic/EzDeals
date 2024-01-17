import  { model, Model, Schema } from "mongoose";
import { IUserDocument } from "../interfaces/user.interfaces";
import { hash, compare } from "bcryptjs";

const SALT_ROUND = 10;

const userSchema: Schema = new Schema({
		username: { type: String ,require:true},
		email: { type: String ,require:true},
		password: { type: String ,require:true},
		createdAt: { type: Date, default: (new Date()).toLocaleDateString() ,require:true},
		profilePicture: { type: String, default: "" },
		honorValue: { type: Number, default: 0 },
		passwordResetToken: { type: String, default: "" },
		passwordResetExpires: { type: Number },
		notifications: {
			messages: { type: Boolean, default: true },
			reactions: { type: Boolean, default: true },
			comments: { type: Boolean, default: true },
			follows: { type: Boolean, default: true }
		},
		quote: { type: String, default: "" }
	}
	,
	{
		toJSON: {
			transform(_doc, ret) {
				delete ret.password;
				return ret;
			}
		}
	}
);

//middleware that executes before saving acc
userSchema.pre("save", async function(this: IUserDocument, next: () => void) {
	const hashedPassword: string = await hash(
		this.password as string,
		SALT_ROUND
	);
	this.password = hashedPassword;
	next();
});

userSchema.methods.comparePassword = async function(
	password: string
): Promise<boolean> {
	const hashedPassword: string = (this as unknown as IUserDocument).password!;
	return compare(password, hashedPassword);
};

userSchema.methods.hashPassword = async function(
	password: string
): Promise<string> {
	return hash(password, SALT_ROUND);
};

const UserModel: Model<IUserDocument> = model<IUserDocument>(
	"User",
	userSchema,
	"User"
);
export { UserModel };
