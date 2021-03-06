

// Week 2: The Mechanics of Interpreted Languages. 
// JavaScript-File-Name: Residential_Controllers.js    Date: 26-06-2020.       Programed-By: Montasser EL Ferjani.
// This Program Is Based On The Algorithm Of Residential_Controllers.algo.

// To Run Scenarios Click On Run / Run Without Debugging / Node.js / Choose DEBUG CONSOLE (Below).
// Note: Node.js Should Be Installed. 


//  1st PART: Objects AND Arrays.

// Elevator Class:

class Elevator {                                                    

    //Constructor

    constructor(id, position, status, weight,end,door) {      

        this.id       = id;
        this.position = position;
        this.status   = status;
        this.weight   = weight;
        this.end      = end;          // To Avoid Undefined Return At The End Of RequestElevator And RequestFloor Functions.
        this.door     = door;
    }

    //Move Best Elevator To Current Floor

    MoveToCurrenFloor(CurrentFloor){

        while((CurrentFloor - BestElevator.position) > 0){
            this.position ++;
                
        }

        while((CurrentFloor - BestElevator.position) < 0){
            this.position --; 
        } 

        this.Doors =  "OPEN";
        console.log("       STEP 1: The Best Elevator Moves To Current Floor: Floor nbr",BestElevator.position,".");

    }

   // Check Elevator Weight

    CheckWeight(){
    
        if (this.weight >= 1200) {
            console.log("Weight is exceeding the capacity of elevator");
            this.status = "Out Of Service";
            return null;
            
        }
        BestElevator.Doors = "CLOSE";
    }

    // Move Best Elevator to Destination

    MoveToDestination(CurrentFloor,Destination){
    
        while((Destination - CurrentFloor) > 0){
            
            this.position ++; 
            CurrentFloor ++;
            
        }

        while((Destination - CurrentFloor) < 0){
            
            this.position --;  
            CurrentFloor --;
        }

        this.Doors = "OPEN";
        console.log("       STEP 2: The Best Elevator reaches the Demand Floor:", this.position );

    }

};
    

// Constructor Function Of Column:

class Column {                          //Constructor
    constructor(Elevators, alarm) {
        
        this.alarm = alarm;
        this.Elevators = Elevators;
    


    }
    
    // Check Alarm Status

    CheckAlarm (){
   
        if(this.alarm === "Problem"){
            BestElevator.status = "Out Of Service";
            log.console("Elevator Is Out Of Service");
            return null;
        }
    }
}


//----------------------------------------------------------------FUNCTIONS----------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

// Initial Condition Of A Global Variable:

var BestElevator = new Elevator;

// Find The Best Elevator Function

function FindBestElevator(CurrentFloor, Direction){

    BestElevator = MyColumn.Elevators[0];
    var BestDistance = Math.abs(MyColumn.Elevators[0].position - CurrentFloor);
    for (var i=1; i<MyColumn.Elevators.length; i++  ){
        
        if(MyColumn.Elevators[i].status === "Active" && BestElevator.status === "Inactive"){
            BestElevator = MyColumn.Elevators[i];
            BestDistance = Math.abs(MyColumn.Elevators[i].position - CurrentFloor);
        }
        
        else if((Math.abs(MyColumn.Elevators[i].position - CurrentFloor)<BestDistance)){
            
            if(MyColumn.Elevators[i].status === "Inactive"  &&  BestElevator.status === "Inactive") {
                BestElevator = MyColumn.Elevators[i];
                BestDistance = Math.abs(MyColumn.Elevators[i].position - CurrentFloor);
                
            }
            if((MyColumn.Elevators[i].status === "Active"  &&  BestElevator.status === "Active")  &&  (MyColumn.Elevators[i].position < CurrentFloor && Direction === "UP") || (MyColumn.Elevators[i].position > CurrentFloor && Direction === "DOWN")){

                BestElevator = MyColumn.Elevators[i];
                BestDistance = Math.abs(MyColumn.Elevators[i].position - CurrentFloor);
            }
        }

        
        if( CurrentFloor === 1 ){
                
            if((MyColumn.Elevators[i].status === "Active"  && MyColumn.Elevators[i].direction != Direction ) || (MyColumn.Elevators[i].status === "Inactive") ){

                BestElevator = MyColumn.Elevators[i];
                BestDistance = Math.abs(MyColumn.Elevators[i].position - CurrentFloor);
            }
        }  
    }

    console.log("");
    console.log("RESULTS OF",Scenario,":");
    console.log("   The Best Elevator Is:",BestElevator.id + 1,".");
    console.log("   The Best Elevator Position: Floor",BestElevator.position);
    console.log("   The Best Distance Is:",BestDistance,"Level(s).");

    return BestElevator
}


//--------------------------------------------------------------- MAIN METHODS ------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------


// Method 1: RequestElevator: Using: CurrentFloor And Direction.
 
function RequestElevator(CurrentFloor,Direction) {
    
    BestElevator = FindBestElevator(CurrentFloor,Direction);
    MyColumn.CheckAlarm();
    BestElevator.MoveToCurrenFloor(CurrentFloor);
    return BestElevator.end;             // To Avoid Undefined Return At The End Of RequestElevator Functions.
}


// Method 2: RequestFloor: Using CurrentFloor AND Destination. 

function RequestFloor (CurrentFloor,Destination){

    BestElevator.CheckWeight();
    MyColumn.CheckAlarm();
    BestElevator.MoveToDestination(CurrentFloor,Destination);
    return BestElevator.end;             // To Avoid Undefined Return At The End Of RequestFloor Functions.
}



//--------------------------------------------------------------  TESTING PROGRAM ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------

// Scenario 1: With elevator-1 Idle (Inactiv) at floor 2 and elevator-2  Idle at floor 6, someone is on floor 3 and requests 
// the 7th floor, elevator-1 is expected to be sent.

var Scenario = "SCENARIO 1";


var Elevator1 =  new Elevator(0,2, "Inactive", 900, "END" );
var Elevator2 =  new Elevator(1,6, "Inactive", 900, "END" ); 

Elevators = [Elevator1,Elevator2];
var MyColumn = new Column (Elevators,"NoProblem");


var CurrentFloor = 3;
var Direction = "UP";

console.log(RequestElevator (CurrentFloor, Direction));

var Destination = 7;

console.log(RequestFloor (CurrentFloor,Destination));

//-------------------------------------------------------------------------------------------------------------------------------------------
// Scenario 2: With elevator-1 idle (Inactiv) at floor 10 and elevator-2 idle at floor 3, someone is on the 1st floor and requests
// the 6th floor, elevator-2 should be sent. 
// 2 minutes later, someone else is on the 3rd floor and requests the 5th floor. Elevator-2 should be sent.
// Finally, a third person is on floor 9 and wants to go down to the 2nd floor. Elevator-1 should be sent

var Scenario = "SCENARIO 2/A";

Elevator1 =  new Elevator(0,10, "Inactive", 900, "END" );
Elevator2 =  new Elevator(1,3, "Inactive", 900, "END" );

Elevators = [Elevator1,Elevator2];

var MyColumn = new Column (Elevators, "NoProblem");

var CurrentFloor = 1;
var Direction = "UP";

console.log(RequestElevator (CurrentFloor, Direction));

var Destination = 6;

console.log(RequestFloor (CurrentFloor,Destination));

//Scenario 2/B ( 2 min later ) ---------------------------------------------------------------------------------------------------------------

var Scenario = "SCENARIO 2/B ( 2 min later )";

var CurrentFloor = 3;
var Direction = "UP";

console.log(RequestElevator (CurrentFloor, Direction));

var Destination = 5;

console.log(RequestFloor (CurrentFloor,Destination));

//Scenario 2/C-------------------------------------------------------------------------------------------------------------------------------

var Scenario = "SCENARIO 2/C";

var CurrentFloor = 9;
var Direction = "DOWN";

console.log(RequestElevator (CurrentFloor, Direction));

var Destination = 2;

console.log(RequestFloor (CurrentFloor,Destination));

//-------------------------------------------------------------------------------------------------------------------------------------------
// Scenario 3: With elevator-1 idle (Inactiv) at floor 10 and elevator-2 moving from floor 3 to floor 6, someone is on floor 3 and 
// requests the 2nd floor. Elevator-1 should be sent. 
// 5 minutes later, someone else is on the 10th floor and wants to go down to the 3rd floor. Elevator-2 should be sent.

var Scenario = "SCENARIO 3/A";

Elevator1 =  new Elevator(0,10, "Inactive", 900, "END" );
Elevator2 =  new Elevator(1,6, "Active", 900, "END" ); 

Elevators = [Elevator1,Elevator2];
var MyColumn = new Column (Elevators,"NoProblem");

var CurrentFloor = 3;
var Direction = "DOWN";

console.log(RequestElevator (CurrentFloor, Direction));

var Destination = 2;

console.log(RequestFloor (CurrentFloor,Destination));

//Scenario 3/B ( 5 min later ) --------------------------------------------------------------------------------------------------------------

var Scenario = "SCENARIO 3/B ( 5 min later )";


var CurrentFloor = 10;
var Direction = "DOWN";

console.log(RequestElevator (CurrentFloor, Direction));

var Destination = 3;

console.log(RequestFloor (CurrentFloor,Destination));