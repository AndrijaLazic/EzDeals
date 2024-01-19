import express, { Express } from "express";
import { config } from "./config";
import { EzDealsServer } from "./setupServer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const database = require("./setupDatabase");
const cron = require("node-cron");

class Application {
	/**
	 * initialize node js application
	 */
	public initialize(): void {
		config.validateConfig();
		const app: Express = express();
		const server: EzDealsServer = new EzDealsServer(app);
		server.start();

		// Your code to execute every 24 hours goes here
		cron.schedule("0 0 * * *", () => {
			database.clearRedis();
		});
	}
}

const application: Application = new Application();
application.initialize();

//to start application use following command in console:
//npm run dev

//Redis command
//sudo service redis-server start
//start redis commander(gui)
//redis-commander
