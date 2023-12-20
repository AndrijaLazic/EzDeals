import scrapy
import json
class GigatronscraperSpider(scrapy.Spider):
    name = "gigatronScraper"
    allowed_domains = ["gigatron.rs"]
    start_urls = ["https://gigatron.rs"]
    currentPage=1
    maxPages=-1
    products=[]
    def parse(self, initialResponse):
        if(initialResponse.status!=200):
            print("Could not access the: "+self.start_urls[0])
            return
        
           
        return scrapy.Request(url="https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente?strana=1",callback=self.parsePage)

        
        #https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente?strana=2

    def parsePage(self,response):
        if(response.status!=200):
            print("Could not access the: https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente?strana="+self.currentPage)
            return
        
            
        
        data=response.json()

        if(self.maxPages==-1):
            self.maxPages=data["totalPages"]

        for hit in data["hits"]["hits"]:
            rowJSON=hit["_source"]["search_result_data"]
            product={
                "productName":rowJSON["name"],
                "productImageURL":rowJSON["image"],
                "productCategory":rowJSON["group_name"],
                "productSubcategory":rowJSON["subcategory"],
                "productURL":self.start_urls[0]+rowJSON["url"]
            }

            self.products.append(product)

        self.currentPage=self.currentPage+1
        if self.currentPage==self.maxPages:
            print("\n\n\n")
            print(len(self.products)) 
            print("\n\n\n")
            return
        
        return scrapy.Request(url="https://search.gigatron.rs/v1/catalog/get/racunari-i-komponente/komponente?strana="+str(self.currentPage),callback=self.parsePage)


       


        
