import sys
import time
from util import ROOT_DIRECTORY
sys.path.append(ROOT_DIRECTORY)

from Scraper.dataBase.Database import Database

test=Database()
print(test)
time.sleep(3)

#python -m TEST