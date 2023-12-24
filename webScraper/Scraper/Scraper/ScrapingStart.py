import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from Scraper.spiders.gigatronScraper import GigatronscraperSpider



settings = get_project_settings()
process = CrawlerProcess(settings)
process.crawl(GigatronscraperSpider)

process.start()  # the script will block here until all crawling jobs are finished