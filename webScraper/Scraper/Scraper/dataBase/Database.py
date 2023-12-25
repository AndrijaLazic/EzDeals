import threading
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from scrapy import Item
from itemadapter import ItemAdapter
from pathlib import Path

from Scraper.dataTypes.Product import *


class Database:
    db = None
    client = None
    productHistoryCollectionName="productHistory"
    _instance = None
    _lock = threading.Lock()

    #__new__ is called whenever Python instantiates a new object of a class
    def __new__(cls):
        #if instance already exists return it
        if cls._instance is not None: 
            return cls._instance
        
        #create new instance if it doesnt exist
        with cls._lock:
            
            # Another thread could have created the instance
            # before we acquired the lock. So check that the
            # instance is still nonexistent.
            if not cls._instance:
                instance=cls._instance = super().__new__(cls)

                dotenv_path =os.path.abspath(os.path.join(os.getcwd(),Path('../../.env')))
                load_dotenv(dotenv_path=dotenv_path)
                
                cls.client = MongoClient(os.getenv('MongoDBConnectionString'))
                cls.db = cls.client[os.getenv('MongoDBName')]
                
                return instance
            
        

        
    def get_db(self):
        return self.db
    
    def close_db(self):
        if self is not None:
            self.client.close()

    
    def insertProduct(self,item:Product,collection_name:str):
        """
        used to insert item into selected collection

        :param item: item u want to insert
        :param collection_name: name of collection u want item to insert into
        :return: _id
        """ 
        return (self.db[collection_name].insert_one(ItemAdapter(item).asdict())).inserted_id
    
    def insertHistory(self,item:ProductHistory,collection_name:str=productHistoryCollectionName):
        """
        used to insert item into selected collection

        :param item: item u want to insert
        :param collection_name: name of collection u want item to insert into
        :return: _id
        """ 
        return (self.db[collection_name].insert_one(ItemAdapter(item).asdict())).inserted_id
    
    def getOneProduct(self,product_name:str,collection_name:str):
        """
        used to get item from selected collection

        :param collection_name: name of collection 
        :param product_name: name of product
        :return: Item
        """ 
        return self.db[collection_name].find_one({'name':product_name})
    
    def getHistoryOfProduct(self,historyID:str,collection_name:str):
        """
        used to get item history from selected collection

        :param historyID: id of selected history
        :param collection_name: name of collection 
        :return: ProductHistory
        """ 
        return self.db[collection_name].find_one({'_id':historyID})
    

    def updateProduct(self,item:Product,collection_name:str):
        """
        used to update item in selected collection

        :param item: item u want to update
        :param collection_name: name of collection u want item to insert into
        :return: _id
        """ 
        return (self.db[collection_name].update_one({'_id':item._id},ItemAdapter(item).asdict())).inserted_id
    
    def updateHistory(self,item:ProductHistory,collection_name:str=productHistoryCollectionName):
        """
        used to update item history

        :param item: item u want to update
        :param collection_name: name of collection u want item to insert into
        :return: _id
        """ 
        return (self.db[collection_name].update_one({'_id':item._id},ItemAdapter(item).asdict())).inserted_id



    