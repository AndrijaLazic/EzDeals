import time
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from Scraper.spiders.gigatronScraper import GigatronscraperSpider

from Scraper.dataBase.Database import Database
from Scraper.ProductMenager import ProductMenager

# Record the start time
start_time = time.time()

database=Database()
monitoriMenager:ProductMenager=ProductMenager("Monitori")
racunarskeKomponenteMenager:ProductMenager=ProductMenager("RacunarskeKomponente")
slusaliceMenager:ProductMenager=ProductMenager("Slusalice")

settings = get_project_settings()
process = CrawlerProcess(settings)
process.crawl(GigatronscraperSpider)

process.start()  # the script will block here until all crawling jobs are finished


#Upload all products to a database
monitoriMenager.uploadProductsToDatabase()
racunarskeKomponenteMenager.uploadProductsToDatabase()
slusaliceMenager.uploadProductsToDatabase()

database.close_db()

# Record the end time
end_time = time.time()

# Calculate the elapsed time
elapsed_time = end_time - start_time

# Print the elapsed time in seconds
print(f"Elapsed Time: {elapsed_time} seconds")