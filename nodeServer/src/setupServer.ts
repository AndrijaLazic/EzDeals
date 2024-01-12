import {Application,json,urlencoded,Response,Request,NextFunction} from "express"
import http from 'http';
import cors from 'cors';
import helmet from "helmet";
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import HTTP_STATUS from 'http-status-codes'
import 'express-async-errors'
import commpression from 'compression'
import {config} from './config'



export class EzDealsServer{
    private app:Application;
    private SERVER_PORT:string|undefined;
    constructor(app:Application){
        this.SERVER_PORT= config.NodeServerPort;
        this.app=app;
    }

    public start():void{
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routeMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }

    private securityMiddleware(app:Application):void{
        app.use(
            cookieSession({
                name:"session",
                keys:[config.SecretKeyOne!,config.SecretKeyTwo!],
                maxAge:86400000,//1day
                secure:config.NODE_ENV !=="development"
            })
        )

        //protects against HTTP Parameter Pollution attacks
        app.use(hpp())

        //Helmet helps secure Express apps by setting HTTP response headers.
        app.use(helmet());

        app.use(
            cors({
                origin:config.CLIENT_URL,
                credentials:true,
                optionsSuccessStatus:200,
                methods:['GET','POST','PUT','DELETE','OPTIONS']
            })
        )
    }

    private standardMiddleware(app:Application):void{
        app.use(commpression())
        app.use(json({
            limit:'50mb'
        }))
        app.use(urlencoded({
            extended:true,
            limit:'50mb'
        }))
    }

    private routeMiddleware(app:Application):void{
        
    }

    private globalErrorHandler(app:Application):void{
        
    }

    private async startServer(app:Application):Promise<void>{
        try{
            const httpServer:http.Server=new http.Server(app);
            this.startHttpServer(httpServer)
        }
        catch (error){
            console.log(error);
        }
    }

    private createSocketIO(httpServer:http.Server):void{
        
    }

    private startHttpServer(httpServer:http.Server):void{
        httpServer.listen(this.SERVER_PORT,()=>{
            console.log(`Server running on port ${this.SERVER_PORT}`);
        })
    }
}