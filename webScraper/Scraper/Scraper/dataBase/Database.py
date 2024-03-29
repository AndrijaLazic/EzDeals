import threading
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from scrapy import Item
from itemadapter import ItemAdapter
from pathlib import Path
from bson import ObjectId

from Scraper.dataTypes.Product import *


class Database:
    db = None
    client = None
    productHistoryCollectionName="productHistory"
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
            Database._instance=None

    
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
    
    def getOneProduct(self,filter:dict,collection_name:str):
        """
        used to get Product from selected collection

        :param collection_name: name of collection 
        :param filter: what product you want to get, needs to be in following format:{'_id':ObjectId(item._id)} or any other 
        :return: Product
        """ 
        product=(self.db[collection_name].find_one(filter))
        if product is None:
            return None
        return Product.from_dict(product)
    
    def getHistoryOfProduct(self,historyID:str,collection_name:str):
        """
        used to get item history from selected collection

        :param historyID: id of selected history
        :param collection_name: name of collection 
        :return: ProductHistory
        """ 
        return self.db[collection_name].find_one({'_id':ObjectId(historyID)})
    
    def getCollection(self,collection_name:str):
        """
        used to get item history from selected collection

        :param historyID: id of selected history
        :param collection_name: name of collection 
        :return: collection
        """ 
        if collection_name not in self.db.list_collection_names():
            return None
        collection=self.db[collection_name]
        return collection
    

    def updateProduct(self,filter:dict ,update:dict,collection_name:str):
        """
        used to update item in selected collection

        :param filter: what product you want to update, needs to be in following format:{'_id':ObjectId(item._id)}
        :param update: changes made to a product
        :param collection_name: name of collection where item can be found
        :return: _id
        """ 

        
        if 'prices' in update:
            for price in update.get("prices"):
                index_to_update = update['prices'].index(price)
                update['prices'][index_to_update]=price.serialize_price()

        update={
            "$set":update
        }
        return (self.db[collection_name].update_one(filter,update))
    
    def insertHistoryNode(self,filter:dict ,historyNode:ProductHistoryNode,collection_name:str=productHistoryCollectionName):
        """
        used to insert node into item history

        :param filter: what history you want to update, needs to be in following format:{'_id':ObjectId(item._id)}
        :param historyNode: node you want to insert
        :param collection_name: name of collection where item can be found
        :return: _id
        """ 
        update={
            "$push":{'history':{
                '$each':[historyNode.giveDict()]
                }
            }
        }

        return (self.db[collection_name].update_one(filter,update))
    
    def createIndex(self,sort:int,field:str,collection:str):
        """
        used to create index on selected field

        :param sort: 1 for acending -1 for decending
        :param field: field you want to set index to
        :param collection: collection you want to set index to
        :return: void
        """ 
        self.db.get_collection(collection).create_index([
            (field,1)
            ])

    def setVisibilityAll(self,collection:str,value:bool):
        """
        Sets visibility of all products to give boolean value
        :return: None
        """

        self.db.get_collection(collection).update_many({},
        { "$set": { 
            "visibility": value
        }})

    