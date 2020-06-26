

// JavaScript-File-Name: Residential_Controllers.js    Date: 26-06-2020.       Programed-By: Montasser EL Ferjani.
// This Program Is Based On The Algorithm Of Residential_Controllers.algo.
// To Run Scenarios Click On Run / Run Without Debugging / Node.js / Choose DEBUG CONSOLE (Below).
// Note: Node.js Should Be Installed. 


//  1st PART: Objects AND Arrays.

// Constructor Function Of Elevator:

class Elevator {                                                    //Constructor

    constructor(id, position, status, weight,end,door) {

        this.id       = id;
        this.position = position;
        this.status   = status;
        this.weight   = weight;
        this.end      = end;          // To Avoid Undefined Return At The End Of RequestElevator And RequestFloor Functions.
        this.door     = door;
    }
    Elev() {                                                          //Prototype

        this.id      = [1, 2];
        this.postion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11];
        this.status  = ["Active", "Inactive", "On Service", "Out Of Service"];
        this.weight  = function () {
            if (weight >= 1200) {
                console.log("Weight is exceeding the capacity of elevator");
                status = "Out Of Service";
            }
        }
        this.end   = "END";
        this.door  = ["OPEN","CLOSE"]

    }

};
    

// Constructor Function Of Column:

class Column {                          //Constructor
    constructor(Elevator, alarm) {
        this.Elevator = Elevator;
        this.alarm = alarm;

    }
    BuilColumn() {                     //Prototype
        this.Elevator = [Elevator, Elevator];
        this.alarm = ["Problem", "NoProblem"];
    }
}


//----------------------------------------------------------------FUNCTIONS----------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

// Initial Condition Of A Global Variable:

var BestElevator = new Elevator;

// Find The Best Elevator Function

function FindBestElevator(CurrentFloor,Direction){

    BestElevator = MyColumn.Elevator[0];
    var BestDistance = Math.abs(MyColumn.Elevator[0].position - CurrentFloor);
    for (var i=1; i<MyColumn.Elevator.length; i++  ){
        
        if(MyColumn.Elevator[i].status === "Active" && BestElevator.status === "Inactive"){
            BestElevator = MyColumn.Elevator[i];
            BestDistance = Math.abs(MyColumn.Elevator[i].position - CurrentFloor);
        }
        
        else if((Math.abs(MyColumn.Elevator[i].position - CurrentFloor)<BestDistance)){
            
            if(MyColumn.Elevator[i].status === "Inactive"  &&  BestElevator.status === "Inactive") {
                BestElevator = MyColumn.Elevator[i];
                BestDistance = Math.abs(MyColumn.Elevator[i].position - CurrentFloor);
                
            }
            if((MyColumn.Elevator[i].status === "Active"  &&  BestElevator.status === "Active")  &&  (MyColumn.Elevator[i].position < CurrentFloor && Direction === "UP") || (MyColumn.Elevator[i].position > CurrentFloor && Direction === "DOWN")){

                BestElevator = MyColumn.Elevator[i];
                BestDistance = Math.abs(MyColumn.Elevator[i].position - CurrentFloor);
            }
        }

        
        if( CurrentFloor === 1 ){
                
            if((MyColumn.Elevator[i].status === "Active"  && MyColumn.Elevator[i].direction != Direction ) || (MyColumn.Elevator[i].status === "Inactive") ){

                BestElevator = MyColumn.Elevator[i];
                BestDistance = Math.abs(MyColumn.Elevator[i].position - CurrentFloor);
            }
        }  
    }

    console.log("");
    console.log("RESULTS OF",Scenario,":");
    console.log("   The Best Elevator Is:",BestElevator.id + 1,".");
    console.log("   The Best Elevator Position: Floor",BestElevator.position);
    console.log("   The Best Distance Is:",BestDistance,"Level(s).");
}

// Check Alarm Status

function CheckAlarm (MyColumn){
   
    if(MyColumn.alarm === "Problem"){
        BestElevator.status = "Out Of Service";
        log.console("Elevator Is Out Of Service");
        return null;
    }
}


//Move Best Elevator To Current Floor

function MoveToCurrenFloor(CurrentFloor,BestElevator){

    while((CurrentFloor - BestElevator.position) > 0){
        BestElevator.position ++;
            
    }

    while((CurrentFloor - BestElevator.position) < 0){
        BestElevator.position --; 
    } 

    BestElevator.Doors =  "OPEN";
    console.log("       STEP 1: The Best Elevator Moves To Current Floor: Floor nbr",BestElevator.position,".");
        
    

}

// Check Elevator Weight

function CheckWeight(BestElevator){
    
    if (BestElevator.weight >= 1200) {
        console.log("Weight is exceeding the capacity of elevator");
        status = "Out Of Service";
        return null;
        
    }
    BestElevator.Doors = "CLOSE";
}


//  // Move Best Elevator to Destination

function MoveToDestination(CurrentFloor,Destination){
    
    while((Destination - CurrentFloor) > 0){
        
        BestElevator.position ++; 
        CurrentFloor ++;
        
    }

    while((Destination - CurrentFloor) < 0){
        
        BestElevator.position --;  
        CurrentFloor --;
    }

    BestElevator.Doors = "OPEN";
    console.log("       STEP 2: The Best Elevator reaches the Demand Floor:", BestElevator.position );
    

}

//--------------------------------------------------------------- MAIN PROGRAM ------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------



// Method 1: RequestElevator: Using: CurrentFloor And Direction.
 
function RequestElevator(CurrentFloor,Direction) {
    
    FindBestElevator(CurrentFloor,Direction)
    CheckAlarm (MyColumn)
    MoveToCurrenFloor(CurrentFloor,BestElevator)
    return BestElevator.end;             // To Avoid Undefined Return At The End Of RequestElevator Functions.
}


// Method 2: RequestFloor: Using CurrentFloor AND Destination. 

function RequestFloor (CurrentFloor,Destination){

    CheckWeight(BestElevator)
    CheckAlarm (MyColumn)
    MoveToDestination(CurrentFloor,Destination)
    return BestElevator.end;             // To Avoid Undefined Return At The End Of RequestFloor Functions.
}



//--------------------------------------------------------------  TESTING PROGRAM ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------

// Scenario 1: With elevator-1 Idle (Inactiv) at floor 2 and elevator-2  Idle at floor 6, someone is on floor 3 and requests 
// the 7th floor, elevator-1 is expected to be sent.

var Scenario = "SCENARIO 1";

var Elevator1 =  new Elevator(0,2, "Inactive", 900, "END" );
var Elevator2 =  new Elevator(1,6, "Inactive", 900, "END" ); 

var MyColumn = new Column ([Elevator1,Elevator2],"NoProblem");


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

var MyColumn = new Column ([Elevator1,Elevator2],"NoProblem");

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

MyColumn = new Column ([Elevator1,Elevator2],"NoProblem");

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