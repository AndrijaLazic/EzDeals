from pymongo import MongoClient
import os
from dotenv import load_dotenv
from scrapy import Item
from itemadapter import ItemAdapter
from pathlib import Path

from Scraper.dataTypes.Product import *


def singleton(cls):
    instances = {}

    def wrapper(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return wrapper
  
@singleton
class Database:
    db = None
    client = None
    productHistoryCollectionName="productHistory"

    
    def __init__(self):

        dotenv_path =os.path.abspath(os.path.join(os.getcwd(),Path('../../../.env')))
        load_dotenv(dotenv_path=dotenv_path)
        self.client = MongoClient(os.getenv('MongoDBConnectionString'))
        self.db = self.client[os.getenv('MongoDBName')]
            
        

        
    def get_db(self):
        return self.db
    
    def close_db(self):
        return self.client.close()

    
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



    