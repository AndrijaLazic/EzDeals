from Scraper.dataTypes.Product import Product,Price,ProductHistory,ProductHistoryNode
from Scraper.dataBase.Database import Database
from bson import ObjectId

class HistoryMenager:
    def UpdateHistory(collection_name:str,currentDate:str):
        """
        used to update product history  once every day
        :collection_name: name of a collection
        :currentDate: current date
        :return: None
        """ 
        database=Database()
        collection=database.getCollection(collection_name)

        if collection is None:
            raise Exception("No collection with given name:"+collection_name)

        for product in collection.find():
            product=Product.from_dict(product)
            bestPrice="-1"
            for price in product.prices:
                if int(price.value)<int(bestPrice) or bestPrice=="-1":
                    bestPrice=price.value
            
            productHistory=ProductHistory.from_dict(database.getHistoryOfProduct(product.historyID,"productHistory"))
            
            if productHistory.history[-1].value !=bestPrice:
                result=database.insertHistoryNode(
                    {'_id':ObjectId(productHistory._id)},
                    ProductHistoryNode(currentDate,bestPrice),
                    "productHistory"
                    )