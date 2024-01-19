import { Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface IUserDocument extends Document {
	_id?: string | ObjectId;
	username: string;
	email: string;
	password: string;
	createdAt?: Date;
	honorValue?: number;
	quote: string;
	notifications: INotificationSettings;
	passwordResetToken?: string;
	passwordResetTokenExpires?: number | string;
	profilePicture?: string;
	comparePassword(password: string): Promise<boolean>;
	hashPassword(password: string): Promise<string>;
}

export interface IUserInfoDocument extends Document {
	_id?: string | ObjectId;
	username: string;
	email: string;
	createdAt: Date;
	honorValue: number;
	quote: string;
	profilePicture?: string;
}

export interface ISignUpPayload {
	username: string;
	password: string;
	email: string;
	quote: string;
	profilePicture?: string;
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
