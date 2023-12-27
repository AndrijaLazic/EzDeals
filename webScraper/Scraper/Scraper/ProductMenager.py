from collections import defaultdict
import threading

from Scraper.dataTypes.Product import Product,Price

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
            

            productOld.addPrice(product.prices[0])

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
            raise Exception("Date provided can't be in the past")
        
        return product
    
    def resetProductMenager(cls):
        with cls._lock:
            cls._instances = {}

    