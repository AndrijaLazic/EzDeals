import scrapy


class ExampleSpider(scrapy.Spider):
    name = "example"
    allowed_domains = ["gigatron.rs"]
    start_urls = ["https://gigatron.rs/racunari-i-komponente/komponente/"]

    def parse(self, response):

        productsXpath=response.xpath('//div[@id="product-grid"]//div[@class="item"]')
        
        print("\n\n\n")
        for productXpath in productsXpath:
            productName=productXpath.xpath('.//a[@class="item__name"]/h4/text()').get()# . at begging means it considers product xpath as a reference
            
            productURL=productXpath.xpath('.//a[@class="item__name"]/@href').get()
            productURL=response.urljoin(productURL)
            
            productPrice=productXpath.xpath('.//div[@class="item__bottom__prices__price"]/text()').get()
            productPrice=productPrice.split(".")
            productPrice=int(productPrice[0]+productPrice[1])
            
            product={
            'productName':productName,
            'productURL':productURL,
            'productPrice':productPrice
            }
            print(product)

        

        print("\n\n\n")
        # print("\n\n\n")
        # print(products)
        # print("\n\n\n")
        


#scrapy crawl example