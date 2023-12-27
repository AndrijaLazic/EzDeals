import sys
import time

from bson import ObjectId



from Scraper.dataBase.Database import Database
from Scraper.dataTypes.Product import ProductHistory,ProductHistoryNode,Product
from Scraper.ProductMenager import ProductMenager

test1=Database()
test2=ProductMenager()

filter={'_id':ObjectId("6589d664213c1235ce8c04b7")} 

product:Product=test1.getOneProduct(filter,"Monitori")
product=Product.from_dict(product)

test2.addProduct(product)

print(test2.giveProduct(product.name))
# product1=ProductHistory.from_dict(product)

# print(product1)

# filter={'_id':ObjectId("6589d664213c1235ce8c0496")} 




# print(product2)
# print(filter)
# print(result)

# change=product1.lastChanges()


# print(change)

# product1.history.append(ProductHistoryNode("25/12/2023 20:22","15999.00"))
# product1.history.append(ProductHistoryNode("25/12/2023 20:22","25999.00"))
# change=product1.lastChanges(2)




#print(test1.insertHistoryNode(filter,change,"Monitori"))

#product1.name="TEST"
#print(product)
#test1.updateProduct(product,"Monitori")
time.sleep(3)

#python -m TEST