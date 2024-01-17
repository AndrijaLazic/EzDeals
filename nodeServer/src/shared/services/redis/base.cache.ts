import { createClient } from 'redis';
import { config } from 'src/config';
import { Logger } from 'winston';


//takes a type of return value from createClient
export type RedisClient=ReturnType<typeof createClient>

export abstract class BaseCache{
	client:RedisClient;
	log:Logger;

	constructor(cacheName:string){
		this.client=createClient({
			url:config.REDIS_HOST
		});
		this.log= config.createLogger(cacheName);
		this.cacheError();
	}

	private cacheError():void{
		this.client.on("error",(error)=>{
			this.log.error(error);
		});
	}


	/**
 * Used to clear all data stored in cache
 *
 */
	public clearCache():void{
		if(!this.client)
			return;
		this.client.FLUSHALL();
	}
}

