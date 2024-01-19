import collections
from lxml import html
import json
import requests

stranaBroj=1
maxStrana=18

products=[]

while 1:
    r = requests.get('https://gigatron.rs/racunari-i-komponente/monitori?poredak=opadajuci&strana='+str(stranaBroj))

    tree = html.fromstring(r.content)

    productsElements=tree.xpath('.//div[@class="item"]')
    
    if len(productsElements)==0:
        break


    for productEl in productsElements:
        name=productEl.xpath('.//a[@class="item__name"]/h4/text()')
        products.append(name[0])

    stranaBroj=stranaBroj+1




print([item for item, count in collections.Counter(products).items() if count > 1])