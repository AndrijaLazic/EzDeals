
# EzDeals

This project serves as the culmination of my academic endeavors, representing my comprehensive exploration and analysis in fulfillment of the requirements for my graduation thesis. 

## The required software



## Installation

1. Download/clone project

2. Download following:
    -python 3.12.1
    -Node.js v20.10.0
    -Redis https://redis.io/docs/install/install-redis/install-redis-on-windows/

3. Download required libraries:
-for python using pip in terminal
```bash
  pip install -r requirements.txt 
  example: pip install pymongo
```
-for node
```bash
  npm install 
```

4. Before starting a project, you need to create a file named ".env" and insert required data. 
Inside .env.example you can find template for your .env file

5. WebScraper is started by navigating to webScraper/Scraper folder and starting ScrapingStart.py by entering following command into terminal

```bash
   python -m ScrapingStart
```

6. Nodejs server is started by navigating to nodeServer/ folder and entering following command into terminal

```bash
   npm run dev
```

7. Fronted is started by navigating to FrontEnd/ezdealfrontend and entering following command into terminal

```bash
   npm run dev
```

8. Redis is started entering following command into terminal

```bash
   sudo service redis-server start
```
