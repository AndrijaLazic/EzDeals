import mongoose from "mongoose";
import {Logger} from 'winston'
import { config } from "./config";

const log:Logger=config.createLogger('setupDatabase');

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        const MongoDBConnectionString = process.env.MongoDBConnectionString;
        const MongoDBName = process.env.MongoDBName;
        if (!MongoDBConnectionString || !MongoDBName) {
            log.error('MongoDB connection string is not provided.');
            process.exit(1);
        }
        const connString=MongoDBConnectionString+"/"+MongoDBName
        mongoose.connect(connString)
            .then(() => {
                log.info('Connected to MongoDB:'+connString);
            })
            .catch((error) => {
                log.error('MongoDB connection error:', error.message);
                process.exit(1);
            });

        mongoose.connection.on('error', (err) => {
            log.error('MongoDB error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            log.info('MongoDB disconnected, trying to reconnect');
            this._connect()
        });
    }
}

module.exports = new Database();