# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface


from dotenv import load_dotenv

from Scraper.dataBase.Database import Database
from Scraper.dataTypes.Product import *

class MongoDBpipeline:
    
    def open_spider(self,spider):
        self.database=Database()

    # def close_spider(self,spider):
    #     self.database.close_db()
        

        

    def process_item(self, item:Product, spider):
        lowestPrice=(min(item.prices, key=lambda x: x.value)).value
        productHistory=ProductHistory()
        productHistory.history.append(ProductHistoryNode(item.lastScraped,lowestPrice))
        
        historyID=self.database.insertHistory(productHistory)
        item.historyID=historyID
        
        self.database.insertProduct(item,item.primaryCategory)
        return
        
        
        
        
