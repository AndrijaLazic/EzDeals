class Product:
        
    def __init__(self, productName, image):
        self.name=productName
        self.prices=[]
        self.image=image

    def addPrice(self,price):
        self.prices.append(price)




class Price:
    def __init__(self,value,date,shopname,dealURL,shopImageURL):
        self.value=value
        self.date=date
        self.shopname=shopname
        self.dealURL=dealURL
        self.shopImageURL=shopImageURL