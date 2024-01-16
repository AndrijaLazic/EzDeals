import { Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface IUserDocument extends Document {
	_id: string | ObjectId;
	authId: string | ObjectId;
	username?: string;
	email?: string;
	password?: string;
	createdAt?: Date;
	honorValue: number;
	quote: string;
	notifications: INotificationSettings;
	passwordResetToken?: string;
	passwordResetTokenExpires?: number | string;
}

export interface IResetPasswordParams {
	username: string;
	email: string;
	ipaddress: string;
	date: string;
}

export interface INotificationSettings {
	messages: boolean;
	reactions: boolean;
	comments: boolean;
	follows: boolean;
}

export interface ISearchUser {
	_id: string;
	profilePicture: string;
	username: string;
	email: string;
}
