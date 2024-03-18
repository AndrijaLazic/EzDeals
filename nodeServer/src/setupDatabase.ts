import mongoose from "mongoose";
import { Logger } from "winston";
import { config } from "./config";
import { RedisFactory } from "./shared/services/redis/RedisFactory";
const fs = require('fs');
const log: Logger = config.createLogger("setupDatabase");

class Database {
	constructor() {
		this._connect();
	}

	_connect() {
		const MongoDBConnectionString = process.env.MongoDBConnectionString;
		const MongoDBName = process.env.MongoDBName;

		const mongodbSettings = JSON.parse(fs.readFileSync('./src/mongodbSettings.json', 'utf8'));

		if (!MongoDBConnectionString || !MongoDBName) {
			log.error("MongoDB connection string is not provided.");
			process.exit(1);
		}
		const connString = MongoDBConnectionString + "/" + MongoDBName;
		mongoose
			.connect(
				connString,
				mongodbSettings
				)
			.then(() => {
				log.info("Connected to MongoDB:" + connString);
				RedisFactory.connect();
			})
			.catch((error) => {
				log.error("MongoDB connection error:", error.message);
				process.exit(1);
			});

		mongoose.connection.on("error", (err) => {
			log.error("MongoDB error:", err);
		});

		mongoose.connection.on("disconnected", () => {
			log.info("MongoDB disconnected, trying to reconnect");
			this._connect();
		});
	}
}

module.exports = new Database();
