# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface


from dotenv import load_dotenv

from .dataBase.Database import Database
from .dataTypes.Product import *

class MongoDBpipeline:
    collection_name="gigatronScrape"
    def open_spider(self,spider):
        self.database=Database()

    def close_spider(self,spider):
        self.database.close_db()

        

    def process_item(self, item, spider):
        self.database.insertProduct(item,self.collection_name)
        return
        
        
        
        
