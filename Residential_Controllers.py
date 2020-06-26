
#Week 2: The Mechanics of Interpreted Languages. 
#Python-File-Name: Residential_Controllers.py    Date: 26-06-2020.       Programed-By: Montasser EL Ferjani.
# This Program Is Based On The Algorithm Of Residential_Controllers.algo.


#1st PART: Objects AND Arrays.

import array as arr

# Constructor Function Of Elevator:

class Elevator:    
    id = int  
    postion = int                                            
    status = str
    weight = int
    end = str
   
    

    def __init__(self, id, position, status, weight, end): 

        self.id       = id
        self.position = position
        self.status   = status
        self.weight   = weight
        self.end = end
        
    def MoveToCurrenFloor(self, CurrentFloor):
    
        while((CurrentFloor-self.position) > 0):
            self.position += 1
    
        while((CurrentFloor-self.position) < 0):
            self.position -= 1


        print("       STEP 1: The Best Elevator Moves To Current Floor: Floor nbr",self.position,".")

    def CheckWeight(self):
    
        if (self.weight >= 1200):
            print("Weight is exceeding the capacity of elevator")
            self.status = "Out Of Service"
        return None
        
    
    
    def MoveToDestination (self, CurrentFloor,Destination):

        while((Destination - CurrentFloor) > 0):
            CurrentFloor += 1
            self.position += 1

        while((Destination - CurrentFloor) < 0):
            self.position -= 1 
            CurrentFloor -= 1

        print("       STEP 2: The Best Elevator reaches the Demand Floor::", self.position )
        

#BestElevator = Elevator

# Constructor Function Of Column:
class Column:
    Elevator = [] 
    alarm = str

    def __init__(self, Elevator, alarm):
        self.Elevator = Elevator
        self.alarm = alarm

    def CheckAlarm (self, BestElevator):
        if (self.alarm == "Problem"):
            BestElevator.status = "Out Of Service"
            print("Elevator Is Out Of Service")

        return None  

# Functions

def FindBestElevator(CurrentFloor,Direction, MyColumn):
    
    BestElevator = MyColumn.Elevator[0]
    BestDistance = abs(MyColumn.Elevator[0].position - CurrentFloor)
    
    for i in range(1, len(MyColumn.Elevator)):
        if(MyColumn.Elevator[i].status == "Active" and BestElevator.status == "Inactive"):
            BestElevator = MyColumn.Elevator[i]
            BestDistance = abs(MyColumn.Elevator[i].position - CurrentFloor)
        
        if((abs(MyColumn.Elevator[i].position - CurrentFloor)<BestDistance)):
            if(MyColumn.Elevator[i].status == "Inactive" and  BestElevator.status == "Inactive"):
                BestElevator = MyColumn.Elevator[i]
                BestDistance = abs(MyColumn.Elevator[i].position - CurrentFloor)

            if((MyColumn.Elevator[i].status == "Active" and  BestElevator.status == "Active") and  (MyColumn.Elevator[i].position < CurrentFloor and Direction == "UP") or (MyColumn.Elevator[i].position > CurrentFloor and Direction == "DOWN")):

                BestElevator = MyColumn.Elevator[i]
                BestDistance = abs(MyColumn.Elevator[i].position - CurrentFloor)

        if( CurrentFloor == 1 ):
                
            if((MyColumn.Elevator[i].status == "Active"  and MyColumn.Elevator[i].direction != Direction ) or (MyColumn.Elevator[i].status == "Inactive") ):

                BestElevator = MyColumn.Elevator[i]
                BestDistance = abs(MyColumn.Elevator[i].position - CurrentFloor)

    print("")
    #print("RESULTS OF",Scenario,":")
    print("   The Best Elevator Is:",BestElevator.id + 1,".")
    print("   The Best Elevator Position: Floor",BestElevator.position)
    print("   The Best Distance Is:",BestDistance,"Level(s).")
    return BestElevator

  



#First Core Function
def RequestElevator(CurrentFloor,Direction, MyColumn):
    
    
    BestElevator = FindBestElevator(CurrentFloor,Direction, MyColumn)
    MyColumn.CheckAlarm (BestElevator)
    BestElevator.MoveToCurrenFloor(CurrentFloor)
    return BestElevator

#Second Core Function

def RequestFloor (CurrentFloor,Destination, BestElevator, MyColumn):

    BestElevator.CheckWeight()
    MyColumn.CheckAlarm (BestElevator)
    BestElevator.MoveToDestination(CurrentFloor,Destination)
    return BestElevator.end


#Main Program
def main():

#Scenario 1: With elevator-1 Idle (Inactiv) at floor 2 and elevator-2  Idle at floor 6, someone is on floor 3 and requests 
# the 7th floor, elevator-1 is expected to be sent.

    
    
    #Scenario = "SCENARIO 1"

    Elevator1 =  Elevator(0, 2, "Inactive", 900, "END" )
    Elevator2 =  Elevator(1,6, "Inactive", 900, "END" )

    MyColumn = Column ([Elevator1,Elevator2],"NoProblem")
    

    CurrentFloor = 3
    Direction = "UP"

    BestElevator = RequestElevator(CurrentFloor, Direction, MyColumn)

    Destination = 7

    print(RequestFloor(CurrentFloor,Destination, BestElevator, MyColumn))



#-------------------------------------------------------------------------------------------------------------------------------------------
# Scenario 2: With elevator-1 idle (Inactiv) at floor 10 and elevator-2 idle at floor 3, someone is on the 1st floor and requests
# the 6th floor, elevator-2 should be sent. 
# 2 minutes later, someone else is on the 3rd floor and requests the 5th floor. Elevator-2 should be sent.
# Finally, a third person is on floor 9 and wants to go down to the 2nd floor. Elevator-1 should be sent

    #Scenario = "SCENARIO 2/A"

    Elevator1 =  Elevator(0,10, "Inactive", 900, "END" )
    Elevator2 =  Elevator(1,3, "Inactive", 900, "END" )

    MyColumn = Column ([Elevator1,Elevator2],"NoProblem")

    CurrentFloor = 1
    Direction = "UP"

    BestElevator = RequestElevator(CurrentFloor, Direction, MyColumn)

    Destination = 6

    print(RequestFloor(CurrentFloor,Destination, BestElevator, MyColumn))

#Scenario 2/B

    #Scenario = "SCENARIO 2/B ( 2 min later )"

    CurrentFloor = 3
    Direction = "UP"

    BestElevator = RequestElevator(CurrentFloor, Direction, MyColumn)

    Destination = 5

    print(RequestFloor(CurrentFloor,Destination, BestElevator, MyColumn))

#Scenario 2/C

    #Scenario = "SCENARIO 2/C"
    CurrentFloor = 9
    Direction = "DOWN"
    BestElevator = RequestElevator(CurrentFloor, Direction, MyColumn)

    Destination = 2

    print(RequestFloor(CurrentFloor,Destination, BestElevator, MyColumn))

#Scenario 3: With elevator-1 idle (Inactiv) at floor 10 and elevator-2 moving from floor 3 to floor 6, someone is on floor 3 and 
#requests the 2nd floor. Elevator-1 should be sent. 
# 5 minutes later, someone else is on the 10th floor and wants to go down to the 3rd floor. Elevator-2 should be sent.

    #Scenario = "SCENARIO 3/A"

    Elevator1 =  Elevator(0,10, "Inactive", 900, "END" )
    Elevator2 =  Elevator(1,6, "Active", 900, "END" )

    MyColumn =  Column ([Elevator1,Elevator2],"NoProblem")

    CurrentFloor = 3
    Direction = "DOWN"

    BestElevator = RequestElevator(CurrentFloor, Direction, MyColumn)

    Destination = 2

    print(RequestFloor(CurrentFloor,Destination, BestElevator, MyColumn))

#Scenario 3/B

    #Scenario = "SCENARIO 3/B ( 5 min later )"

    CurrentFloor = 10
    Direction = "DOWN"

    BestElevator = RequestElevator(CurrentFloor, Direction, MyColumn)

    Destination = 3

    print(RequestFloor(CurrentFloor,Destination, BestElevator, MyColumn))

if __name__ == "__main__":
    main()