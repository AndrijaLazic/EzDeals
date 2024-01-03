import scrapy
import json
from datetime import datetime

from Scraper.dataTypes.Product import Product,Price
from Scraper.spiders.PageInfo import PageInfo

class TehnomanijaSpider(scrapy.Spider):
    name = "tehnomanijaScraper"
    allowed_domains = ["tehnomanija.rs"]
    start_urls = ["https://www.tehnomanija.rs"]
    dt_string=""

    pagesToScrape=[
        PageInfo("https://www.tehnomanija.rs/it-gaming/racunarske-komponente/procesori?p=",1,"RacunarskeKomponente"),
        PageInfo("https://www.tehnomanija.rs/it-gaming/monitori?p=",1,"Monitori"),
        PageInfo("https://www.tehnomanija.rs/tv-foto-audio-i-video/slusalice-zvucnici-i-audio-uredjaji/slusalice?p=",1,"Slusalice")
    ]
    
    def parse(self, initialResponse):
        if(initialResponse.status!=200):
            print("\n")
            print("Could not access the: "+self.start_urls[0])
            print("\n")
            return
        self.now = datetime.now()
        self.dt_string = self.now.strftime("%d/%m/%Y %H:%M")

        for page in self.pagesToScrape:
            yield scrapy.Request(url=page.getCurrentURL(),callback=self.parsePage)

    

    def parsePage(self,response):
        

        if(response.status!=200):
            print("\n")
            print("Could not access the: "+response.url)
            print("\n")
            return
        
        currentPage=None
        for page in self.pagesToScrape:

            if page.URL in response.url:
                currentPage=page
                break


        productsElements=response.xpath('.//ol[@class="products list items product-items"]//div[@class="product-item-info"]')

        if len(productsElements) ==0:
            return
        
        for productEl in productsElements:
            product=Product(
                (productEl.xpath('.//a[@class="product-item-link"]/text()').get()).strip(),
                (productEl.xpath('.//img[@class="product-image-photo"]/@src').get()).strip(),
                self.dt_string,
                currentPage.category
            )
            product.addPrice(Price(
                ((productEl.xpath('.//span[@class="price"]/text()').get()).strip()).split(",")[0],
                "Tehnomanija",
                (productEl.xpath('.//a[@class="product-item-link"]/@href').get()).strip(),
                "https://www.tehnomanija.rs/media/logo/stores/1/tehnomanija-logo-white.png"))
            yield product
            
 
        
        yield scrapy.Request(url=currentPage.getCurrentURL(),callback=self.parsePage)


       
#scrapy crawl tehnomanijaScraper

        
