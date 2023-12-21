# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

import logging
import pymongo
import os
from dotenv import load_dotenv
from pathlib import Path
from .dataTypes.Product import *
from itemadapter import ItemAdapter

class MongoDBpipeline:
    collection_name="gigatronScrape"

    def open_spider(self,spider):
        dotenv_path =os.path.abspath(os.path.join(os.getcwd(),Path('../../../.env')))
        load_dotenv(dotenv_path=dotenv_path)
        self.client=pymongo.MongoClient(os.getenv('MongoDBConnectionString'))
        self.db=self.client[os.getenv('MongoDBName')]

    def close_spider(self,spider):
        self.client.close()

    def process_item(self, item, spider):
        # print("\n\n\n")
        # print(item)
        # print("\n\n\n")
        self.db[self.collection_name].insert_one(ItemAdapter(item).asdict())
        
        
        
        
