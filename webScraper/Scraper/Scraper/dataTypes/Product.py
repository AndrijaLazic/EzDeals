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

    # Custom serialization function for the 'Price' class
    def serialize_price(self):
        return {'value': self.value, 
                'shopname': self.shopname,
                'dealURL': self.dealURL,
                'shopImageURL': self.shopImageURL}


@dataclass
class Product:
    name: str
    image: str
    prices: List[Price]
    currentBestPrice:str
    historyID:str
    dateAdded:str
    lastScraped:str
    primaryCategory:str
    visibility:bool
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
        _currentBestPrice=str(obj.get("currentBestPrice"))
        _visibility=bool(obj.get("visibility"))
        product=Product(_name, _image,_dateAdded,_primaryCategory)
        product.prices=_prices
        product.historyID=_historyID
        product.lastScraped=_lastScraped
        product._id=_id
        product.currentBestPrice=_currentBestPrice
        product.visibility=_visibility

        return product
    
    def __init__(self,name,image,dateAdded,primaryCategory,lastScraped=None):
        self.name=name
        self.image=image
        self.prices=[]
        self.historyID=""
        self.dateAdded=dateAdded
        self.primaryCategory=primaryCategory
        self.currentBestPrice=""
        if lastScraped is None:
            lastScraped=dateAdded
        self.lastScraped=lastScraped
        self.visibility=True
    
    def addPrice(self,price):
        # Append the new price to the list
        self.prices.append(price)
        
    @staticmethod
    def returnProductChanges(oldProduct:'Product',newProduct:'Product'):
        """
        used to get product changes

        :param oldProduct: Old version of a product
        :param newProduct: New version of a product
        :return: dict
        """
        differences = {}
        
        differences["visibility"]=True
        
        if oldProduct.lastScraped!= newProduct.lastScraped:
            differences["lastScraped"] = newProduct.lastScraped
        
        differences["prices"] = newProduct.prices
        
        if oldProduct.image=="":
            differences["image"]=newProduct.image
        
        if oldProduct.currentBestPrice!= newProduct.currentBestPrice:
            differences["currentBestPrice"]=newProduct.currentBestPrice

        return differences
    

    

@dataclass
class ProductHistoryNode:
    date:datetime.date
    value:str
    @staticmethod
    def from_dict(obj: Any) -> 'ProductHistoryNode':
        _date=str(obj.get("date"))
        _value=str(obj.get("value"))
        productHist=ProductHistoryNode(_date,_value)
        return productHist
    
    def __init__(self,date,value):
        self.date=date
        self.value=value

    def giveDict(self):
        return {
            "date":self.date,
            "value":self.value
        }

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

    def lastChanges(self,numberOfNodes:int=1):
        """
        used to get last history change
        :return: dict
        """
        
        newArray=[]
        for item in self.history[-numberOfNodes:]:
            newArray.append(item.giveDict())

        return {'history':{
            '$each':newArray
            }
        }


    #{'history': [{'date': '25/12/2023 20:22', 'value': '5999.00'}], '_id': '6589d664213c1235ce8c0496'}