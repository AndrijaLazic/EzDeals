from dataclasses import dataclass
import json
from scrapy.item import Item,Field

class Product(Item):
    name=Field()
    prices=Field()
    image=Field()

    def addPrice(self,price):
        # Ensure 'prices' is a list, create an empty list if it doesn't exist
        prices = self.setdefault("prices", [])
        # Append the new price to the list
        prices.append(price)
        



@dataclass
class Price:
    value: int
    date: str
    shopname: str
    dealURL: str
    shopImageURL: str

    def __init__(self,value,date,shopname,dealURL,shopImageURL):
        self.value=value
        self.date=date
        self.shopname=shopname
        self.dealURL=dealURL
        self.shopImageURL=shopImageURL