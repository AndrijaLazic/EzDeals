import { config } from "src/config";
import { Logger } from "winston";
import { BaseCache, RedisClient } from "./base.cache";
import { createClient } from "redis";
import { UserCache } from "./user.cache";
import { ProductCache } from "./product.cache";

const log: Logger = config.createLogger("redisConnection");

export enum CacheTypes {
	UserCache,
	ProductCache
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

	/**
	 * Get cache of selected type
	 * @param T return type
	 * @param cachetype type of cache you want
	 */
	getCache<T extends BaseCache>(cachetype: CacheTypes): T {
		let cache = redisFactory.cacheMap.get(cachetype);
		if (cache) {
			return cache as T;
		}
		switch (cachetype) {
			case CacheTypes.UserCache:
				cache = new UserCache(redisFactory.client);
				redisFactory.cacheMap.set(cachetype, cache);
				break;
			case CacheTypes.ProductCache:
				cache = new ProductCache(redisFactory.client);
				redisFactory.cacheMap.set(cachetype, cache);
				break;

			default:
				throw new Error(
					"Selected cache:" + CacheTypes[cachetype] + " does not exist"
				);
		}
		return cache as T;
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
