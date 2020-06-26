

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
    end    = str

    def __init__(self, id, position, status, weight,end): 

        self.id       = id
        self.position = position
        self.status   = status
        self.weight   = weight
        self.end      = end

BestElevator = Elevator

# Constructor Function Of Column:
class Column:
    Elevator = [] 
    alarm = str

    def __init__(self, Elevator, alarm):
        self.Elevator = Elevator
        self.alarm = alarm


# Functions

def RequestElevator(CurrentFloor,Direction):
    BestElevator = Elevator
    BestElevator = MyColumn.Elevator[0]
    BestDistance = abs(MyColumn.Elevator[0].position - CurrentFloor)
    
    for i in range(1, MyColumn.Elevator.length):
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

    if(MyColumn.alarm == "Problem"):
        BestElevator.status = "Out Of Service"
        print("Elevator Is Out Of Service")

    while((CurrentFloor-BestElevator.position) > 0):
        BestElevator.position += 1
    
    while((CurrentFloor-BestElevator.position) < 0):
        BestElevator.position -= 1

    BestElevator.Doors =  "Opened"

    print("       STEP 1: The Best Elevator Moves To Current Floor: Floor nbr",BestElevator.position,".")

def RequestFloor (CurrentFloor,Destination):

    while((Destination - CurrentFloor) > 0):
        BestElevator.position += 1 
        CurrentFloor += 1

    while((Destination - CurrentFloor) < 0):
        BestElevator.position -= 1 
        CurrentFloor -= 1

    print("       STEP 2: The Best Elevator reaches the Demand Floor::", BestElevator.position )


def main():

#Scenario 1:

    
    BestElevator = Elevator
    #Scenario = "SCENARIO 1"

    Elevator1 =  Elevator(0, 2, "Inactive", 900, "END" )
    Elevator2 =  Elevator(1,6, "Inactive", 900, "END" )

    MyColumn = Column ([Elevator1,Elevator2],"NoProblem")

    CurrentFloor = 3
    Direction = "UP"

    print(RequestElevator(CurrentFloor, Direction))

    Destination = 7

    print(RequestFloor(CurrentFloor,Destination))



#Scenario 2:

    #Scenario = "SCENARIO 2/A"

    Elevator1 =  Elevator(0,10, "Inactive", 900, "END" )
    Elevator2 =  Elevator(1,3, "Inactive", 900, "END" )

    MyColumn = Column ([Elevator1,Elevator2],"NoProblem")

    CurrentFloor = 1
    Direction = "UP"

    print(RequestElevator (CurrentFloor, Direction))

    Destination = 6

    print(RequestFloor (CurrentFloor,Destination))

#Scenario 2/B

    #Scenario = "SCENARIO 2/B ( 2 min later )"

    CurrentFloor = 3
    Direction = "UP"

    (RequestElevator (CurrentFloor, Direction))

    Destination = 5

    print(RequestFloor (CurrentFloor,Destination))

#Scenario 2/C

    #Scenario = "SCENARIO 2/C"
    CurrentFloor = 9
    Direction = "DOWN"
    print(RequestElevator (CurrentFloor, Direction))

    Destination = 2

    print(RequestFloor (CurrentFloor,Destination))

#Scenario 3

    #Scenario = "SCENARIO 3/A"

    Elevator1 =  Elevator(0,10, "Inactive", 900, "END" )
    Elevator2 =  Elevator(1,6, "Active", 900, "END" )

    MyColumn =  Column ([Elevator1,Elevator2],"NoProblem")

    CurrentFloor = 3
    Direction = "DOWN"

    print(RequestElevator (CurrentFloor, Direction))

    Destination = 2

    print(RequestFloor (CurrentFloor,Destination))

#Scenario 3/B

    #Scenario = "SCENARIO 3/B ( 5 min later )"

    CurrentFloor = 10
    Direction = "DOWN"

    print(RequestElevator (CurrentFloor, Direction))

    Destination = 3

    print(RequestFloor (CurrentFloor,Destination))

if __name__ == "__main__":
    main()