import sys
import time



from Scraper.dataBase.Database import Database
from Scraper.dataTypes.Product import Product
test1=Database()
product=test1.getOneProduct('LG 23.8" IPS 24QP750-B Monitor',"Monitori")
product=Product.from_dict(product)
product.name="TEST"
print(product)
test1.updateProduct(product,"Monitori")
time.sleep(3)

#python -m TEST