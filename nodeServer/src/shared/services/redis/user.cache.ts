import { IUserDocument } from "src/features/user/interfaces/user.interfaces";
import { BaseCache, RedisClient } from "./base.cache";
import { config } from "src/config";
import { Logger } from "winston";
import { ServerError } from "src/shared/globals/helpers/error-handler";
const log: Logger = config.createLogger("userCache");

export class UserCache extends BaseCache {
	constructor(client: RedisClient) {
		super("UserCache", client);
	}

	public async saveDataToCache(
		key: string,
		uId: string,
		createdUser: IUserDocument
	): Promise<void> {
		const {
			_id,
			username,
			email,
			honorValue,
			createdAt,
			quote,
			notifications,
			passwordResetToken,
			passwordResetTokenExpires,
			profilePicture
		} = createdUser;

		const firstList: string[] = [
			"_id",
			`${_id}`,
			"username",
			`${username}`,
			"email",
			`${email}`,
			"honorValue",
			`${honorValue}`,
			"createdAt",
			`${createdAt}`,
			"quote",
			`${quote}`,
			"passwordResetToken",
			`${passwordResetToken}`,
			"passwordResetTokenExpires",
			`${passwordResetTokenExpires}`,
			"profilePicture",
			`${profilePicture}`
		];

		const secondList: string[] = [
			"notifications",
			JSON.stringify(notifications)
		];

		const dataToSave: string[] = [...firstList, ...secondList];

		try {
			if (!this.client.isOpen) {
				await this.client.connect();
			}
			await this.client.ZADD("user", {
				score: parseInt(uId, 10),
				value: `${key}`
			});
			await this.client.HSET(`users:${key}`, dataToSave);
		} catch (error) {
			log.error(error);
			throw new ServerError("Server error try again");
		}
	}
}
