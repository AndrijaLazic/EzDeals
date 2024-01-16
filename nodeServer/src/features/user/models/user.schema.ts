import mongoose, { model, Model, Schema } from "mongoose";
import { IUserDocument } from "../interfaces/user.interfaces";

const userSchema: Schema = new Schema({
	authId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", index: true },
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
});

const UserModel: Model<IUserDocument> = model<IUserDocument>(
	"User",
	userSchema,
	"User"
);
export { UserModel };
