import sys
import time

from bson import ObjectId



from Scraper.dataBase.Database import Database
from Scraper.dataTypes.Product import Product
test1=Database()
product=test1.getOneProduct('LG 23.8" IPS 24QP750-B Monitor',"Monitori")
product1=Product.from_dict(product)

# product2=test1.getOneProduct('LG 34" IPS 34WP88CP-B Ergo monitor',"Monitori")
product2=Product.from_dict(product)

product2.name="TEST"



filter={'_id':ObjectId(product2._id)}
result=Product.returnProductChanges(product1,product2)

print(product2)
print(filter)
print(result)

print(test1.updateProduct(filter,result,"Monitori"))

#product1.name="TEST"
#print(product)
#test1.updateProduct(product,"Monitori")
time.sleep(3)

#python -m TEST