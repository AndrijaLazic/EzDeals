from ast import List
import random
import threading

class UserAgent:
    counter:int
    info:str
    def __init__(self,info,counter=0):
        """
        :param info: User Agent information
        :param counter: used to balance out Agent workload
        :return: UserAgent
        """
        self.info=info
        self.counter=counter


#singleton
class AgentMenager:
    _instance = None
    _lock = threading.Lock()
    AgentLIST:[UserAgent]=[]
    RandomCombination:[int]=[]

    combinationCounter=0

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
                AgentMenager.AgentLIST.append(UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0"))
                AgentMenager.AgentLIST.append(UserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"))
                AgentMenager.AgentLIST.append(UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0"))
                AgentMenager.AgentLIST.append(UserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.3"))
                AgentMenager.AgentLIST.append(UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0."))

                arraySize=len(AgentMenager.AgentLIST)
                AgentMenager.RandomCombination=AgentMenager.generate_list(arraySize*4,arraySize)

                return instance

    def giveAgent(self):
        """
        Returns random user agent
        :return: UserAgent
        """
        if self.combinationCounter>len(self.RandomCombination):
            self.combinationCounter=0
        agent=self.AgentLIST[self.RandomCombination[self.combinationCounter]].info
        self.combinationCounter=self.combinationCounter+1

        return agent
    

    def generate_list(m:int, n:int):
        """
        Generates a list with m elements. Element can be number from 0 to n 
        with an equal number of occurrences
        :param m: number of elements
        :param n: Element can be a number in range from 0-n
        :return: [int]
        """
        # Ensure m is divisible by n
        if m % n != 0:
            raise ValueError("m must be divisible by n for equal occurrences")

        occurrences_per_number = m // n
        result = []

        for num in range(0, n):
            result.extend([num] * occurrences_per_number)

        # Shuffle the list to make the order random
        random.shuffle(result)
        return result

        

    
        
