import { createClient } from "redis";
import { config } from "src/config";
import { Logger } from "winston";

//takes a type of return value from createClient
export type RedisClient = ReturnType<typeof createClient>;

export abstract class BaseCache {
	client: RedisClient;
	log: Logger;

	constructor(cacheName: string, client: RedisClient) {
		this.log = config.createLogger(cacheName);
		this.client = client;
		this.cacheError();
	}

	private cacheError(): void {
		this.client.on("error", (error) => {
			this.log.error(error);
		});
	}

	//abstract saveDataToCache(...args: any[]): Promise<void>;
}
