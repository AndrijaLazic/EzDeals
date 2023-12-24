class PageInfo:
    URL:str
    index:int
    maxIndex:int
    category:str

    def __init__(self,URL:str,index:int,category):
        self.URL=URL
        self.index=index
        self.maxIndex=-1
        self.category=category

    def getCurrentURL(self):
        """
        Returns current page url
        :return: str
        """
        url=self.URL+str(self.index)
        self.index=self.index+1
        return url
