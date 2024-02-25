# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface


from dotenv import load_dotenv
from itemadapter import ItemAdapter
import scrapy
from Scraper.dataBase.Database import Database
from Scraper.dataTypes.Product import *
from scrapy.exceptions import DropItem
from Scraper.ProductMenager import ProductMenager




class MongoDBpipeline:
    monitoriMenager:ProductMenager=ProductMenager("Monitori")
    racunarskeKomponenteMenager:ProductMenager=ProductMenager("RacunarskeKomponente")
    slusaliceMenager:ProductMenager=ProductMenager("Slusalice")
    laptopoviMenager:ProductMenager=ProductMenager("Laptopovi")
    mobilniTelefoniMenager:ProductMenager=ProductMenager("MobilniTelefoni")
    
    def open_spider(self,spider):
        self.database=Database()

    # def close_spider(self,spider):
    #     self.database.close_db()
        

        

    def process_item(self, item:Product, spider:scrapy.Spider):
        match item.primaryCategory:
            case "Monitori":
                self.monitoriMenager.addProduct(item)

            case "RacunarskeKomponente":
                self.racunarskeKomponenteMenager.addProduct(item)

            case "Slusalice":
                self.slusaliceMenager.addProduct(item)
            
            case "Laptopovi":
                self.laptopoviMenager.addProduct(item)

            case "MobilniTelefoni":
                self.mobilniTelefoniMenager.addProduct(item)

            


        
        return
    


                
        
        
        
