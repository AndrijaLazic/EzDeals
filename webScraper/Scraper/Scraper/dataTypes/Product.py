from typing import List
from typing import Any
from dataclasses import dataclass

from scrapy import Item
import datetime

@dataclass
class Price:
    value: str
    shopname: str
    dealURL: str
    shopImageURL: str

    @staticmethod
    def from_dict(obj: Any) -> 'Price':
        _value = str(obj.get("value"))
        _shopname = str(obj.get("shopname"))
        _dealURL = str(obj.get("dealURL"))
        _shopImageURL = str(obj.get("shopImageURL"))
        return Price(_value, _shopname, _dealURL, _shopImageURL)
    
    def __init__(self,value,shopname,dealURL,shopImageURL):
        self.value=value
        self.shopname=shopname
        self.dealURL=dealURL
        self.shopImageURL=shopImageURL

@dataclass
class Product:
    name: str
    image: str
    prices: List[Price]
    historyID:str
    dateAdded:str
    lastScraped:str
    primaryCategory:str
    _id:str


    @staticmethod
    def from_dict(obj: Any) -> 'Product':
        _name = str(obj.get("name"))
        _image = str(obj.get("image"))
        _historyID = str(obj.get("historyID"))
        _dateAdded = str(obj.get("dateAdded"))
        _lastScraped = str(obj.get("lastScraped"))
        _primaryCategory = str(obj.get("primaryCategory"))
        _prices = [Price.from_dict(y) for y in obj.get("prices")]
        _id=str(obj.get("_id"))
        product=Product(_name, _image,_dateAdded,_primaryCategory)
        product.prices=_prices
        product.historyID=_historyID
        product.lastScraped=_lastScraped
        product._id=_id

        return product
    
    def __init__(self,name,image,dateAdded,primaryCategory,lastScraped=None):
        self.name=name
        self.image=image
        self.prices=[]
        self.historyID=""
        self.dateAdded=dateAdded
        self.primaryCategory=primaryCategory
        if lastScraped is None:
            lastScraped=dateAdded

        self.lastScraped=lastScraped
    
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
    _id:str
    @staticmethod
    def from_dict(obj: Any) -> 'ProductHistory':
        _history = [ProductHistoryNode.from_dict(y) for y in obj.get("history")]
        _id=str(obj.get("_id"))
        productHist=ProductHistory()
        productHist.history=_history
        productHist._id=_id
        return productHist
    
    def __init__(self):
        self.history=[]
        self.historyID=""




    