from ast import List
import json
import os
import random
import threading
from pathlib import Path

from dotenv import load_dotenv



#singleton
class AgentMenager:
    _instance = None
    _lock = threading.Lock()
    AgentLIST:[str]=[]
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
                cls._instance = super().__new__(cls)

                # Open the JSON file
                with open('UserAgents.json', 'r') as file:
                    AgentMenager.AgentLIST = (json.load(file))["Agents"]

                arraySize=len(AgentMenager.AgentLIST)

                

                AgentMenager.RandomCombination=AgentMenager.generate_list(arraySize*4,arraySize)
            return cls._instance

                

    def giveAgent(self):
        """
        Returns random user agent
        :return: UserAgent
        """

        if self.combinationCounter>=len(self.RandomCombination):
            self.combinationCounter=0
        agent=self.AgentLIST[self.RandomCombination[self.combinationCounter]]
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

        

    
        
