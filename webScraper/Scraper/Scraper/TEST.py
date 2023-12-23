import sys
import time


from Scraper.dataBase.Database import Database
from Scraper.AgentMenager import AgentMenager

test1=AgentMenager()
test2=AgentMenager()

print(test1 is test2)
time.sleep(3)

#python -m TEST