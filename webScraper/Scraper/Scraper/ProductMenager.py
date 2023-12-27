from collections import defaultdict
import threading

from Scraper.dataTypes.Product import Product,Price

class ProductMenager:
    _instance = None
    _lock = threading.Lock()

    productsMap={}

    #__new__ is called whenever Python instantiates a new object of a class
    def __new__(cls):

        #if instance already exists return it
        if cls._instance is not None: 
            return cls._instance
        
        #create new instance if it doesnt exist
        with cls._lock:
            
            # Another thread could have created the instance
            # before we acquired the lock. So check that the
            # instance is still nonexistent.
            if not cls._instance:
                instance=cls._instance = super().__new__(cls)
                instance.productsMap=defaultdict(Product)

                return instance
            
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
            

            productOld.addPrice(Price(product.prices[0]))

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

    