import scrapy
import json
from datetime import datetime

from Scraper.dataTypes.Product import Product,Price
from Scraper.spiders.PageInfo import PageInfo

class PcPracticSpider(scrapy.Spider):
    name = "pcPracticScraper"
    allowed_domains = ["pcpractic.rs"]
    start_urls = ["https://pcpractic.rs"]
    dt_string=""

    pagesToScrape=[
        PageInfo("https://pcpractic.rs/racunari-monitori-komponente/komponente/procesori.html?p=",1,"RacunarskeKomponente"),
        PageInfo("https://pcpractic.rs/racunari-monitori-komponente/komponente/maticne-ploce.html?p=",1,"RacunarskeKomponente"),
        PageInfo("https://pcpractic.rs/racunari-monitori-komponente/monitori.html?p=",1,"Monitori"),
        PageInfo("https://search.gigatron.rs/v1/catalog/get/tv-audio-video/slusalice?strana=",1,"Slusalice")
        
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


        productsElements=response.xpath('.//div[@id="amasty-shopby-product-list"]//div[@class="product-item-info"]')

        if len(productsElements) ==0:
            return
        
        for productEl in productsElements:
            product=Product(
                (productEl.xpath('.//a[@class="product-item-link"]/text()').get()).strip(),
                (productEl.xpath('.//img[@class="product-image-photo"]/@src').get()).strip(),
                self.dt_string,
                currentPage.category
            )
            price=(productEl.xpath('.//span[@class="price"]/text()').get()).strip().split(",")[0]
            price=price.split(".")[0]+price.split(".")[1]
            product.addPrice(Price(
                price,
                "PcPractic",
                (productEl.xpath('.//a[@class="product photo product-item-photo"]/@href').get()).strip(),
                "https://pcpractic.rs/media/logo/stores/1/logo.png"))
            yield product
        
            
        yield scrapy.Request(url=currentPage.getCurrentURL(),callback=self.parsePage)


       
#scrapy crawl pcPracticScraper

        
