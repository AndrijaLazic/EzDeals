require("dotenv").config();
require("dotenv").config({ path: process.env.GlobalEnvFilePath });
import * as winston from "winston";
import "winston-daily-rotate-file";
import JWT from "jsonwebtoken";

class Config {
	public MongoDBConnectionString: string | undefined;
	public MongoDBName: string | undefined;
	public ScrapingLogFolder: string | undefined;
	public NodeServerPort: string | undefined;
	public SecretKeyOne: string | undefined;
	public SecretKeyTwo: string | undefined;
	public NODE_ENV: string | undefined;
	public CLIENT_URL: string | undefined;
	public REDIS_HOST: string | undefined;
	public NODE_LOG_LEVEL: string | undefined;
	public JWT_SECRET_KEY: string | undefined;
	public JWT_OPTIONS: JWT.SignOptions | undefined = undefined;
	public PRODUCT_CATEGORIES: string[] | undefined;

	constructor() {
		this.MongoDBConnectionString = process.env.MongoDBConnectionString;
		this.MongoDBName = process.env.MongoDBName;
		this.ScrapingLogFolder = process.env.ScrapingLogFolder;
		this.NodeServerPort = process.env.NodeServerPort;
		this.SecretKeyOne = process.env.SecretKeyOne;
		this.SecretKeyTwo = process.env.SecretKeyTwo;
		this.NODE_ENV = process.env.NODE_ENV;
		this.CLIENT_URL = process.env.CLIENT_URL;
		this.REDIS_HOST = process.env.REDIS_HOST;
		this.NODE_LOG_LEVEL = process.env.NODE_LOG_LEVEL;
		this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

		if (process.env.PRODUCT_CATEGORIES) {
			this.PRODUCT_CATEGORIES = process.env.PRODUCT_CATEGORIES.split(",");
		}
		if (process.env.JWT_OPTIONS) {
			const jsonObject = JSON.parse(
				process.env.JWT_OPTIONS
			) as JWT.SignOptions;
			this.JWT_OPTIONS = jsonObject;
		}
	}

	public createLogger(name: string) {
		const transport = new winston.transports.DailyRotateFile({
			filename: "Loggs/app-%DATE%.log",
			maxFiles: "14d"
		});

		return winston.createLogger({
			// Required
			level: this.NODE_LOG_LEVEL,

			format: winston.format.combine(
				winston.format.errors({ stack: true }),
				winston.format.colorize(),
				winston.format.timestamp({
					format: "YYYY-MM-DD hh:mm:ss A"
				}),
				winston.format.align(),
				winston.format.printf(
					(info) =>
						`${info.timestamp} ${info.level}:${name}${info.message}`
				)
			),
			transports: [new winston.transports.Console(), transport]
		});
	}

	public validateConfig(): void {
		for (const [key, value] of Object.entries(this)) {
			if (value === undefined) {
				throw new Error(`Configuration ${key} is undefined.`);
			}
		}
	}
	
	public checkIfCategoryExists(category:string):boolean{
		if (config.PRODUCT_CATEGORIES?.includes(category))
			return true;
		return false;
	}
}

export const config: Config = new Config();
