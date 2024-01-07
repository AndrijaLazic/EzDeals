import scrapy
import json
from datetime import datetime

from Scraper.dataTypes.Product import Product,Price
from Scraper.spiders.PageInfo import PageInfo

class GstoreSpider(scrapy.Spider):
    name = "gstoreScraper"
    allowed_domains = ["gstore.rs"]
    start_urls = ["https://www.gstore.rs"]
    dt_string=""

    pagesToScrape=[
        PageInfo("https://www.gstore.rs/komponente-i-mrezna-oprema/komponente/procesori?page=",1,"RacunarskeKomponente"),
        PageInfo("https://www.gstore.rs/komponente-i-mrezna-oprema/komponente/maticne-ploce?page=",1,"RacunarskeKomponente"),
        PageInfo("https://www.gstore.rs/racunari--monitori--softver/monitori-i-oprema/monitori?page=",1,"Monitori"),
        #PageInfo("https://www.gstore.rs/audio-video-foto/slusalice?page=",1,"Slusalice")
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


        productsElements=response.xpath('.//div[@class="shop-product-card relative"]')

        if len(productsElements)==0:
            return

        for productEl in productsElements:
            pictureURL=(productEl.xpath(".//div[@class='product-image-wrapper']/a/img/@src")).get()
            if pictureURL is None:
                pictureURL=""

            name=(productEl.xpath('.//h2[@class="product-name"]/a/text()').get()).strip()
            product=Product(
                name,
                pictureURL,
                self.dt_string,
                currentPage.category
            )
            product.addPrice(Price(
                ((productEl.xpath('.//div[@class="price-holder"]/text()').get()).strip()).split(",")[0],
                "Tehnomanija",
                (productEl.xpath('.//h2[@class="product-name"]/a/@href').get()).strip(),
                "https://www.gstore.rs/images/gstore-final-logo-with%20background%20w%20or%20b-21.png"))
            yield product
            
 
        
        yield scrapy.Request(url=currentPage.getCurrentURL(),callback=self.parsePage)


       
#scrapy crawl gstoreScraper

        