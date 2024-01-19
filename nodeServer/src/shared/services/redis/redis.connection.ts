import { config } from "src/config";
import { Logger } from "winston";
import { BaseCache } from "./base.cache";

const log: Logger = config.createLogger("redisConnection");

class RedisConnection extends BaseCache {
	constructor() {
		super("RedisConnection");
	}

	async connect(): Promise<void> {
		try {
			await this.client.connect().then(() => {
				log.info("Connected to Redis");
			});
		} catch (error) {
			log.error(error);
		}
	}
}

export const redisConnection: RedisConnection = new RedisConnection();
