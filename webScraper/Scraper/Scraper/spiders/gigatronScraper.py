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
        PageInfo("https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente/procesori?poredak=opadajuci&strana=",1,"RacunarskeKomponente"),
        PageInfo("https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente/maticne-ploce?poredak=opadajuci&strana=",1,"RacunarskeKomponente"),  
        PageInfo("https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/monitori?poredak=opadajuci&strana=",1,"Monitori"),
        PageInfo("https://search.gigatron.rs/v1/catalog/get/tv-audio-video/slusalice?poredak=opadajuci&strana=",1,"Slusalice"),
        PageInfo("https://search.gigatron.rs/v1/catalog/get/prenosni-racunari/laptop-racunari?strana=",1,"Laptopovi"),
        PageInfo("https://search.gigatron.rs/v1/catalog/get/mobilni-telefoni-i-oprema/mobilni-telefoni?strana=",1,"MobilniTelefoni"),
        PageInfo("https://search.gigatron.rs/v1/catalog/get/oprema-za-racunare/smestanje-podataka/eksterni-hdd-i-ssd?strana=",1,"EksterniDiskovi"),
    ]
    
    def parse(self, initialResponse):
        if(initialResponse.status!=200):
            print("Could not access the: "+self.start_urls[0])
            return
        self.now = datetime.now()
        self.dt_string = self.now.strftime("%d/%m/%Y %H:%M")

        for page in self.pagesToScrape:
            yield scrapy.Request(
                url=page.getCurrentURL(),
                callback=self.parsePage)
    
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
            currentPage.maxIndex=data["totalPages"]

        for hit in data["hits"]["hits"]:
            rowJSON=hit["_source"]["search_result_data"]
            price=rowJSON["price"].split(".")[0]
            product=Product(rowJSON["name"],rowJSON["image"],self.dt_string,currentPage.category)
            product.addPrice(Price(price,"Gigatron",self.start_urls[0]+rowJSON["url"],"https://gigatron.rs/images/gigatron.png"))
            yield product

        if currentPage.index>currentPage.maxIndex:
            return #self.products
        
        yield scrapy.Request(
            url=currentPage.getCurrentURL(),
            callback=self.parsePage)

       
#scrapy crawl gigatronScraper

        
