require('dotenv').config()
require('dotenv').config({ path: process.env.GlobalEnvFilePath })

class Config{
    public MongoDBConnectionString:string|undefined;
    public MongoDBName:string|undefined;
    public ScrapingLogFolder:string|undefined;
    public NodeServerPort:string|undefined;
    public SecretKeyOne:string|undefined;
    public SecretKeyTwo:string|undefined;
    public NODE_ENV:string|undefined;
    public CLIENT_URL:string|undefined;
    public REDIS_HOST:string|undefined;
    

    constructor(){
        this.MongoDBConnectionString=process.env.MongoDBConnectionString;
        this.MongoDBName=process.env.MongoDBName;
        this.ScrapingLogFolder=process.env.ScrapingLogFolder;
        this.NodeServerPort=process.env.NodeServerPort;
        this.SecretKeyOne=process.env.SecretKeyOne;
        this.SecretKeyTwo=process.env.SecretKeyTwo;
        this.NODE_ENV=process.env.NODE_ENV;
        this.CLIENT_URL=process.env.CLIENT_URL;
        this.REDIS_HOST=process.env.REDIS_HOST;
    }

    public validateConfig():void{
        for(const [key,value] of Object.entries(this)){
            if(value===undefined){
                throw new Error(`Configuration ${key} is undefined.`)
            }
        }
    }
}

export const config:Config=new Config() ;