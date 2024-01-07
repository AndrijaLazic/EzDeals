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
        collection=Database().getCollection(collection_name)

        for product in collection.find():
            product=Product.from_dict(product)
            bestPrice="-1"
            for price in product.prices:
                if price.value<bestPrice or bestPrice=="-1":
                    bestPrice=price.value
            
            productHistory=ProductHistory.from_dict(Database().getHistoryOfProduct(product.historyID,"productHistory"))
            
            if productHistory.history[-1].value !=bestPrice:
                Database().insertHistoryNode(
                    {'_id':ObjectId(productHistory._id)},
                    ProductHistoryNode(currentDate,bestPrice),
                    collection_name
                    )