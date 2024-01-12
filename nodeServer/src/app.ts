import express, {Express} from 'express'

require('dotenv').config({ path: '.env' })
require('dotenv').config({ path: process.env.GlobalEnvFilePath })

const database = require('./setupDatabase');

import {EzDealsServer} from './setupServer'


class Application{
    /**
     * initialize node js application
     */
    public initialize():void {
        

        
        const app:Express=express();
        const server:EzDealsServer=new EzDealsServer(app);
        server.start();
        
    }
}

const application:Application=new Application();
application.initialize();


//to start application use following command in console:
//npm run dev