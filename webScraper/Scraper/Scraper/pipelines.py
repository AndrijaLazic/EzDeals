# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface


import os
from dotenv import load_dotenv
from itemadapter import ItemAdapter
import scrapy
from Scraper.dataBase.Database import Database
from Scraper.dataTypes.Product import *
from scrapy.exceptions import DropItem
from Scraper.ProductMenager import ProductMenager




class MongoDBpipeline:
    mapOfProductMenagers={}
    
    for categoryName in os.environ.get("PRODUCT_CATEGORIES").split(","):
        mapOfProductMenagers[categoryName]=ProductMenager(categoryName)
    
    def open_spider(self,spider):
        self.database=Database()

    # def close_spider(self,spider):
    #     self.database.close_db()
        

        

    def process_item(self, item:Product, spider:scrapy.Spider):
        if item.primaryCategory in self.mapOfProductMenagers: 
            self.mapOfProductMenagers[item.primaryCategory].addProduct(item)

            


        
        return
    


                
        
        
        
