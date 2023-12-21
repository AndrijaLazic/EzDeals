import scrapy
import json
from datetime import datetime

from ..dataTypes.Product import Product,Price

class GigatronscraperSpider(scrapy.Spider):
    name = "gigatronScraper"
    allowed_domains = ["gigatron.rs"]
    start_urls = ["https://gigatron.rs"]
    currentPage=1
    maxPages=-1
    
    def parse(self, initialResponse):
        if(initialResponse.status!=200):
            print("Could not access the: "+self.start_urls[0])
            return
        self.now = datetime.now()
        self.dt_string = self.now.strftime("%d/%m/%Y %H:%M")
        return scrapy.Request(url="https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente?strana=1",callback=self.parsePage)

        
        #https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente?strana=2

    def parsePage(self,response):
        if(response.status!=200):
            print("Could not access the: https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente?strana="+self.currentPage)
            return
        
        self.currentPage=self.currentPage+1     
        
        data=response.json()

        if(self.maxPages==-1):
            self.maxPages=3#data["totalPages"]

        for hit in data["hits"]["hits"]:
            rowJSON=hit["_source"]["search_result_data"]
            # product={
            #     "productName":rowJSON["name"],
            #     "productImageURL":rowJSON["image"],
            #     "productCategory":rowJSON["group_name"],
            #     "productSubcategory":rowJSON["subcategory"],
            #     "productURL":self.start_urls[0]+rowJSON["url"],
            #     "productPrice":rowJSON["price"]
            # }
            product=Product()
            product["name"]=rowJSON["name"]
            product["image"]=rowJSON["image"]
            product.addPrice(Price(rowJSON["price"],self.dt_string,"Gigatron",self.start_urls[0]+rowJSON["url"],"https://gigatron.rs/images/gigatron.png"))
            yield product

        

        
        if self.currentPage==self.maxPages:
            return #self.products
        
        yield scrapy.Request(url="https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente?strana="+str(self.currentPage),callback=self.parsePage)


       
#scrapy crawl gigatronScraper

        
