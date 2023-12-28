import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from Scraper.spiders.gigatronScraper import GigatronscraperSpider

from Scraper.dataBase.Database import Database
from Scraper.ProductMenager import ProductMenager
database=Database()


settings = get_project_settings()
process = CrawlerProcess(settings)
process.crawl(GigatronscraperSpider)

monitoriMenager:ProductMenager=ProductMenager("Monitori")
racunarskeKomponenteMenager:ProductMenager=ProductMenager("RacunarskeKomponente")
slusaliceMenager:ProductMenager=ProductMenager("Slusalice")

process.start()  # the script will block here until all crawling jobs are finished
#Afther scraping is finnished insert all products into database


database.close_db()

