from collections import defaultdict
from datetime import datetime
import threading
import traceback

from Scraper.dataTypes.Product import Product,Price,ProductHistory,ProductHistoryNode
from Scraper.dataBase.Database import Database
from bson import ObjectId

class ProductMenager:
    _instances = {}
    _lock = threading.Lock()
    
    productsMap={}

    #__new__ is called whenever Python instantiates a new object of a class
    def __new__(cls,productCategory:str):
        #if instance already exists return it
        if not cls._instances:
            cls._instances=defaultdict(ProductMenager)


        if productCategory in cls._instances: 
            return cls._instances.get(productCategory)
        
        #create new instance if it doesnt exist
        with cls._lock:
            
            # Another thread could have created the instance
            # before we acquired the lock. So check that the
            # instance is still nonexistent.
            if productCategory not in cls._instances: 
                cls._instances[productCategory] = super().__new__(cls)
                cls._instances[productCategory].productsMap=defaultdict(Product)

        return cls._instances.get(productCategory)
        

            
    def clearMap(self):
        """
        Clears map of products
        :return: None
        """
        with self._lock:
            self.productsMap=defaultdict(Product)
    
    def addProduct(self,product:Product):
        """
        Add a product to the map
        :param product: product you wish to add
        :return: None
        """
        with self._lock:
            productOld:Product=self.productsMap.get(product.name)
            if productOld is None:
                self.productsMap[product.name]=product
                return
            #check for duplicates, only gigatron store
            if product.prices[0].shopname=="Gigatron":
                for price in productOld.prices:
                    if price.shopname==product.prices[0].shopname:
                        return
            productOld.addPrice(product.prices[0])
            self.productsMap[product.name]=productOld
    def giveProduct(self,name:str):
        """
        Return product with given name from the map
        :param name: name of a product
        :return: Product
        """
        product=None
        with self._lock:
            product=self.productsMap.get(name)

        if product is None:
            raise Exception("No product with that name found")
        
        return product
    
    def resetProductMenager(cls):
        with cls._lock:
            cls._instances = {}

    def getCurrentInstanceCategory(self):
        """
        Returns a category of current instance
        :return: str
        """
        for key, val in self._instances.items():
            if val == self:
                return key
        raise Exception("No product menager found")

    def uploadProductsToDatabase(self):
        """
        Uploads all products to the selected category
        :return: None
        """

        category=self.getCurrentInstanceCategory()

        print("\n\n\n\n")
        print("Started uploading products from category:")
        print(category)
        print("\n\n\n\n")

        database=Database()

        database.createIndex(1,"name",category)

        currentTime = datetime.now()
       

        #Iterating trough all items and checking if they already exist in database
        for key, val in self.productsMap.items():
            oldProduct=database.getOneProduct({'name':key},category)
            lowestPrice=(min(val.prices, key=lambda x: x.value)).value
            
            if oldProduct is None:
                
                val.currentBestPrice=lowestPrice
                val.dateAdded=currentTime
                val.lastScraped=currentTime
                productHistory=ProductHistory()
                productHistory.history.append(ProductHistoryNode(val.lastScraped,lowestPrice))
                
                historyID=database.insertHistory(productHistory)
                val.historyID=historyID
                database.insertProduct(val,category)
                continue

            val.currentBestPrice=lowestPrice
            changes=Product.returnProductChanges(oldProduct,val)
            database.updateProduct({'_id':ObjectId(oldProduct._id)},changes,category)
            
    def setVisibilityAll(self,value:bool):
        """
        Sets visibility of all products to give boolean value
        :return: None
        """

        category=self.getCurrentInstanceCategory()

        print("\n\n\n\n")
        print("Setting visibility of all products in category:")
        print(category)
        print("\n\n\n\n")

        database=Database()
       
        database.setVisibilityAll(category,value)
                    
            


    