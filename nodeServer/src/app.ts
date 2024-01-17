import express, { Express } from "express";
import { config } from "./config";
import { EzDealsServer } from "./setupServer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const database = require("./setupDatabase");

class Application {
	/**
	 * initialize node js application
	 */
	public initialize(): void {
		config.validateConfig();
		const app: Express = express();
		const server: EzDealsServer = new EzDealsServer(app);
		server.start();
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
