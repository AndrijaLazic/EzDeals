import multiprocessing
import os
import threading
import time
import scrapy
import schedule
from pathlib import Path
from dotenv import load_dotenv
import sys
from datetime import datetime

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from Scraper.spiders.gigatronScraper import GigatronscraperSpider
from Scraper.spiders.pcPracticScraper import PcPracticSpider
from Scraper.spiders.tehnomanijaScraper import TehnomanijaSpider
from Scraper.spiders.gstoreScraper import GstoreSpider

from Scraper.dataBase.Database import Database
from Scraper.ProductMenager import ProductMenager
from Scraper.HistoryMenager import HistoryMenager
# Record the start time

dotenv_path =os.path.abspath(os.path.join(os.getcwd(),Path('../../.env')))
load_dotenv(dotenv_path=dotenv_path)
                

def Scraping():

    # Save the current stdout for later restoration
    original_stdout = sys.stdout

    currentTime = datetime.now()
    dt_string = currentTime.strftime("%d.%m.%Y %H.%M")

    LogFile=open(os.getenv('ScrapingLogFolder')+dt_string+".txt", 'w')
    sys.stdout = LogFile

    start_time = time.time()
    database=Database()
    monitoriMenager:ProductMenager=ProductMenager("Monitori")
    racunarskeKomponenteMenager:ProductMenager=ProductMenager("RacunarskeKomponente")
    slusaliceMenager:ProductMenager=ProductMenager("Slusalice")

    settings = get_project_settings()
    process = CrawlerProcess(settings)
    process.crawl(GigatronscraperSpider)
    process.crawl(PcPracticSpider)
    process.crawl(TehnomanijaSpider)
    process.crawl(GstoreSpider)


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

    # Restore the original stdout
    sys.stdout = original_stdout

    LogFile.close()


def HistoryLogging(collection_name:str,currentTime:str,):
    try:
        HistoryMenager.UpdateHistory(collection_name,currentTime)
    except Exception as error:
        print(error)

    
    

def HistoryThreading():
    currentTime = datetime.now()
    print("started history log at:")
    print(currentTime)
    dt_string = currentTime.strftime("%d/%m/%Y %H:%M")
    threading.Thread(target=HistoryLogging,args=("Monitori",dt_string)).start()
    threading.Thread(target=HistoryLogging,args=("RacunarskeKomponente",dt_string)).start()
    #threading.Thread(target=HistoryLogging,args=("Slusalice",dt_string)).start()

def run_process(job_func):
    process = multiprocessing.Process(target=job_func)
    process.start()



schedule.every().hour.do(run_process,Scraping)
schedule.every().day.at('00:00').do(HistoryThreading)

if __name__ == "__main__":
    while 1:
        schedule.run_pending()
        time.sleep(60)
