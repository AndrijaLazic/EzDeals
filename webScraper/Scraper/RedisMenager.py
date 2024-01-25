import os
import threading
from time import sleep
from dotenv import load_dotenv
import redis
from pathlib import Path

dotenv_path =os.path.abspath(os.path.join(os.getcwd(),Path('../../.env')))
load_dotenv(dotenv_path=dotenv_path)

class RedisDatabase:
    redisHost=os.getenv('REDIS_HOST').split(":")
    r = None

    _instance = None
    _lock = threading.Lock()

    #__new__ is called whenever Python instantiates a new object of a class
    def __new__(cls):
        
        #create new instance if it doesnt exist
        with cls._lock:
            #if instance already exists return it
            if cls._instance is not None: 
                return cls._instance
            
            
            instance=cls._instance = super().__new__(cls)

            cls.r=redis.Redis(cls.redisHost[1].split("//")[1], port=cls.redisHost[2], decode_responses=True)
            
            return instance
        
    def clearDatabase(self):
        print("Clearing cache")
        self.r.flushall()