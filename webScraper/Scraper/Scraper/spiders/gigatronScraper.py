import scrapy
import json
from datetime import datetime

from Scraper.dataTypes.Product import Product,Price
from Scraper.spiders.PageInfo import PageInfo

class GigatronscraperSpider(scrapy.Spider):
    name = "gigatronScraper"
    allowed_domains = ["gigatron.rs"]
    start_urls = ["https://gigatron.rs"]
    dt_string=""

    pagesToScrape=[
        PageInfo("https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente?strana=",1,"RacunarskeKomponente"),
        PageInfo("https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/monitori?strana=",1,"Monitori"),
        #PageInfo("https://search.gigatron.rs/v1/catalog/get/tv-audio-video/slusalice?strana=",1,"Slusalice")
    ]
    
    def parse(self, initialResponse):
        if(initialResponse.status!=200):
            print("Could not access the: "+self.start_urls[0])
            return
        self.now = datetime.now()
        self.dt_string = self.now.strftime("%d/%m/%Y %H:%M")

        for page in self.pagesToScrape:
            yield scrapy.Request(url=page.getCurrentURL(),callback=self.parsePage)

    

    def parsePage(self,response):
        if(response.status!=200):
            print("Could not access the: "+response.url)
            return
        
        currentPage=None
        for page in self.pagesToScrape:

            if page.URL in response.url:
                currentPage=page
                break

        
                
        data=response.json()

        if(currentPage.maxIndex==-1):
            currentPage.maxIndex=3#data["totalPages"]

        for hit in data["hits"]["hits"]:
            rowJSON=hit["_source"]["search_result_data"]
            # product={
            #     "productCategory":rowJSON["group_name"],
            #     "productSubcategory":rowJSON["subcategory"],
            # }
            product=Product(rowJSON["name"],rowJSON["image"],self.dt_string,currentPage.category)
            product.addPrice(Price(rowJSON["price"],"Gigatron",self.start_urls[0]+rowJSON["url"],"https://gigatron.rs/images/gigatron.png"))
            yield product

        

        
        if currentPage.index>currentPage.maxIndex:
            return #self.products
        
        yield scrapy.Request(url=currentPage.getCurrentURL(),callback=self.parsePage)


       
#scrapy crawl gigatronScraper

        
