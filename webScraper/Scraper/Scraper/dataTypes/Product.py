from typing import List
from typing import Any
from dataclasses import dataclass

from scrapy import Item
import datetime

@dataclass
class Price:
    value: str
    date: str
    shopname: str
    dealURL: str
    shopImageURL: str

    @staticmethod
    def from_dict(obj: Any) -> 'Price':
        _value = str(obj.get("value"))
        _date = str(obj.get("date"))
        _shopname = str(obj.get("shopname"))
        _dealURL = str(obj.get("dealURL"))
        _shopImageURL = str(obj.get("shopImageURL"))
        return Price(_value, _date, _shopname, _dealURL, _shopImageURL)
    
    def __init__(self,value,date,shopname,dealURL,shopImageURL):
        self.value=value
        self.date=date
        self.shopname=shopname
        self.dealURL=dealURL
        self.shopImageURL=shopImageURL

@dataclass
class Product:
    name: str
    image: str
    prices: List[Price]
    historyID:str

    @staticmethod
    def from_dict(obj: Any) -> 'Product':
        _name = str(obj.get("name"))
        _image = str(obj.get("image"))
        _historyID = str(obj.get("historyID"))
        _prices = [Price.from_dict(y) for y in obj.get("prices")]
        product=Product(_name, _image)
        product.prices=_prices
        product.historyID=_historyID
        return product
    
    def __init__(self,name,image):
        self.name=name
        self.image=image
        self.prices=[]
        self.historyID=""
    
    def addPrice(self,price):
        # Append the new price to the list
        self.prices.append(price)

@dataclass
class ProductHistoryNode:
    date:datetime.date
    value:int

@dataclass
class ProductHistory:
    history:List[ProductHistoryNode]

    @staticmethod
    def from_dict(obj: Any) -> 'ProductHistory':
        _history = [ProductHistoryNode.from_dict(y) for y in obj.get("history")]
        productHist=ProductHistory()
        productHist.history=_history
        return productHist
    
    def __init__(self):
        self.history=[]
        self.historyID=""




    