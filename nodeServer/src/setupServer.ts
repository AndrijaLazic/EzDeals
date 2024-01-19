import {
	Application,
	json,
	urlencoded,
	Response,
	Request,
	NextFunction
} from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import cookieSession from "cookie-session";
import HTTP_STATUS from "http-status-codes";
import "express-async-errors";
import commpression from "compression";
import { config } from "./config";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import applicationRoutes from "./routes";

import {
	CustomError,
	IErrorResponse
} from "./shared/globals/helpers/error-handler";
import { Logger } from "winston";

const log: Logger = config.createLogger("setupServer");

export class EzDealsServer {
	private app: Application;
	private SERVER_PORT: string | undefined;
	constructor(app: Application) {
		this.SERVER_PORT = config.NodeServerPort;
		this.app = app;
	}

	public start(): void {
		this.securityMiddleware(this.app);
		this.standardMiddleware(this.app);
		this.routeMiddleware(this.app);
		this.globalErrorHandler(this.app);
		this.startServer(this.app);
	}

	private securityMiddleware(app: Application): void {
		app.use(
			cookieSession({
				name: "session",
				keys: [config.SecretKeyOne!, config.SecretKeyTwo!],
				maxAge: 86400000, //1day
				secure: config.NODE_ENV !== "development"
			})
		);

		//protects against HTTP Parameter Pollution attacks
		app.use(hpp());

		//Helmet helps secure Express apps by setting HTTP response headers.
		app.use(helmet());

		app.use(
			cors({
				origin: config.CLIENT_URL,
				credentials: true,
				optionsSuccessStatus: 200,
				methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
			})
		);
	}

	private standardMiddleware(app: Application): void {
		app.use(commpression());
		app.use(
			json({
				limit: "50mb"
			})
		);
		app.use(
			urlencoded({
				extended: true,
				limit: "50mb"
			})
		);
	}

	private routeMiddleware(app: Application): void {
		applicationRoutes(app);
	}

	private globalErrorHandler(app: Application): void {
		app.all("*", (request: Request, response: Response) => {
			response
				.status(HTTP_STATUS.NOT_FOUND)
				.json({ message: `${request.originalUrl} not found` });
		});

		app.use(
			(
				error: IErrorResponse,
				request: Request,
				response: Response,
				next: NextFunction
			) => {
				log.error(error);
				if (error instanceof CustomError) {
					return response
						.status(error.statusCode)
						.json(error.serializeErrors());
				}
				next();
			}
		);
	}

	private async startServer(app: Application): Promise<void> {
		try {
			const httpServer: http.Server = new http.Server(app);
			const socketIO: Server = await this.createSocketIO(httpServer);
			this.startHttpServer(httpServer);
			this.socketIOConnections(socketIO);
		} catch (error: any) {
			log.error("startServer:" + error);
		}
	}

	private async createSocketIO(httpServer: http.Server): Promise<Server> {
		const io: Server = new Server(httpServer, {
			cors: {
				origin: config.CLIENT_URL,
				methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
			}
		});

		const pubClient = createClient({ url: config.REDIS_HOST });
		const subClient = pubClient.duplicate();

		await Promise.all([pubClient.connect(), subClient.connect()]);
		io.adapter(createAdapter(pubClient, subClient));
		return io;
	}

	private startHttpServer(httpServer: http.Server): void {
		log.info(`server has started with process ${process.pid}`);
		httpServer.listen(this.SERVER_PORT, () => {
			log.info(`Server running on port ${this.SERVER_PORT}`);
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	private socketIOConnections(io: Server): void {}
}
