import { config } from "src/config";
import { Logger } from "winston";
import { BaseCache, RedisClient } from "./base.cache";
import { createClient } from "redis";
import { UserCache } from "./user.cache";

const log: Logger = config.createLogger("redisConnection");

export enum CacheTypes {
	UserCache
}

class redisFactory {
	private static client: RedisClient;
	private static cacheMap: Map<CacheTypes, BaseCache> = new Map();

	constructor() {
		this.connect();
	}

	async connect(): Promise<void> {
		if (redisFactory.client) return;

		try {
			redisFactory.client = createClient({
				url: config.REDIS_HOST
			});

			await redisFactory.client
				.connect()
				.then(() => {
					log.info("Connected to Redis:" + config.REDIS_HOST);
					this.clearCache();
				})
				.catch((error: any) => {
					log.error("Redis connection error:", error);
					process.exit(1);
				});
		} catch (error) {
			log.error(error);
		}
	}

	getCache(cachetype: CacheTypes): BaseCache {
		let cache = redisFactory.cacheMap.get(cachetype);
		if (cache) {
			return cache;
		}
		switch (cachetype) {
			case CacheTypes.UserCache:
				cache = new UserCache(redisFactory.client);
				redisFactory.cacheMap.set(cachetype, cache);
				break;
			default:
				throw new Error(
					"Selected cache:" + CacheTypes[cachetype] + " does not exist"
				);
		}
		return cache;
	}

	/**
	 * Used to clear all data stored in cache
	 *
	 */
	public clearCache(): void {
		if (!redisFactory.client) return;
		redisFactory.client.FLUSHALL();
	}
}

export const RedisFactory: redisFactory = new redisFactory();
