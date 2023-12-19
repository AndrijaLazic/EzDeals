import scrapy


class ExampleSpider(scrapy.Spider):
    name = "example"
    allowed_domains = ["gigatron.rs/"]
    start_urls = ["https://gigatron.rs/"]

    def parse(self, response):
        pass
