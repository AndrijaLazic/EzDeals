import mongoose from "mongoose";


class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        const MongoDBConnectionString = process.env.MongoDBConnectionString;
        const MongoDBName = process.env.MongoDBName;
        if (!MongoDBConnectionString || !MongoDBName) {
            console.error('MongoDB connection string is not provided.');
            process.exit(1);
        }
        const connString=MongoDBConnectionString+"/"+MongoDBName
        mongoose.connect(connString)
            .then(() => {
                console.log('Connected to MongoDB:'+connString);
            })
            .catch((error) => {
                console.error('MongoDB connection error:', error.message);
                process.exit(1);
            });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected, trying to reconnect');
            this._connect()
        });
    }
}

module.exports = new Database();