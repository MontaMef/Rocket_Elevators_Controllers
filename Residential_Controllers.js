


//  1st PART: Objects AND Arrays.

const { callbackify } = require("util");

// Constructor Function Of Elevator:

class Elevator {                                                    //Constructor

    constructor(id, position, status, weight, doors, direction) {

        this.id = id;
        this.position = position;
        this.status = status;
        this.weight = weight;
        this.doors = doors;
        this.direction = direction;
    }
    Elev() {                                                          //Prototype

        this.id = [1, 2];
        this.postion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.status = ["Active", "Inactive", "On Service", "Out Of Service"];
        this.weight = function () {
            if (weight >= 1200) {
                console.log("Weight is exceeding the capacity of elevator");
                status = "Out Of Service";
            }
        },
         this.doors = ["Closed", "Opened"];
        this.direction = ["UP", "DOWN"];

    }

    Move() {


    }

};
    


// Constructor Function Of Column:

class Column {                          //Constructor
    constructor(Elevator, alarm) {
        this.Elevator = Elevator;
        this.alarm = alarm;
    }
    BuilColumn() {                     //Prototype
        this.Elevator = [elevator, elevator];
        this.alarm = ["Problem", "NoProblem"];
    }
}


//------------------------------------------------------------------- FUNCTIONS --------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------

// The Following Functions will be classified under RequestElevator Section:

function FindBestElevator(CurrentFloor,Direction){
    var BestElevator = Column.Elevator[0];
    var BestDistance = Math.abs(Column.Elevator[0].position - CurrentFloor);
    for (var i=1; i<Column.Elevator.length; i++  ){
        
        if(Math.abs(Column.Elevator[i].position - CurrentFloor)<BestDistance){
            
            if((Column.Elevator[i].position < CurrentFloor && Direction === "UP") || (Column.Elevator[i].position > CurrentFloor && Direction === "DOWN") ){
                
                if((Column.Elevator[i].status === "Inactive") || (Column.Elevator[i].status === "Active"  && Column.Elevator[i].direction === Direction ) ){

                    BestElevator = Column.Elevator[i];
                    BestDistance = Math.abs(Column.Elevator[i].position - CurrentFloor);
                }
            }
            if( CurrentFloor === 1 ){
                
                if((Column.Elevator[i].status === "Inactive") ||(Column.Elevator[i].status === "Active"  && Column.Elevator[i].direction != Direction ) ){

                    BestElevator = Column.Elevator[i];
                    BestDistance = Math.abs(Column.Elevator[i].position - CurrentFloor);
                }
            } 
        };
    };
    
    console.log("The Best Elevator Is:",BestElevator.id + 1);
    console.log("The Best Elevator Position:",BestElevator.position,"Floor(s)");
    console.log("The Best Distance Is:",BestDistance,"Level(s)");
   // return BestElevator;
    
}


function CheckAlarmStatus (){
    while(Column.alarm === "Problem"){
        BestElevator.status === "Out Of Service";
        log.console("Elevator Is Out Of Service");
    }
}


function MoveToCurrentFloor(BestElevator,CurrentFloor){
   
    while((CurrentFloor-BestElevator.position) > 0){
        BestElevator.position ++;
          
    }

    while((CurrentFloor-BestElevator.position) < 0){
        BestElevator.position --; 
    } 

    BestElevator.Doors ===  "Opened";
    console.log("The New Position Of Best Elevator Is:",BestElevator.position,"Floor");
}


//The Following Functions will be classified under RequestFloor Section:

function MoveToDistination (CurrentFloor,Destination,BestElevator){

    if((Destination - CurrentFloor) > 0){
        BestElevator.position++;  
    }

    if((Destination - CurrentFloor) < 0){
        BestElevator.position--;  
    }

    BestElevator.doors = "Opened";
    console.log("The Best Elevator reaches the Demand Floor:", BestElevator.position);
}


//--------------------------------------------------------------- MAIN PROGRAM ------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

// Method 1: RequestElevator.

function RequestElevator (CurrentFloor, Direction){
    call(FindBestElevator(CurrentFloor,Direction));
    call(CheckAlarmStatus);
    call(MoveToCurrentFloor(BestElevator,CurrentFloor));

};

// Method 2: RequestFloor.

function RequestFloor(){
    call(MoveToDistination(CurrentFloor,Destination,BestElevator));
}

console.log("Hi");


//--------------------------------------------------------------  TESTING PROGRAM ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------

// Scenario 1: With elevator-1 Idle (Inactiv) at floor 2 and elevator-2  Idle at floor 6, someone is on floor 3 and requests 
// the 7th floor, elevator-1 is expected to be sent.

var Elevator1 =  new Elevator(0,2, "Inative", 900, "Closed","UP" );
var Elevator2 =  new Elevator(1,6, "Inactive", 900, "Closed","DOWN" ); 

var MyColumn = new Column ([Elevator1,Elevator2],"NoProblem");

var CurrentFloor = 3;
var Direction = "UP";

console.log(RequestElevator (CurrentFloor, Direction));






// Scenario 2: With elevator-1 idle (Inactiv) at floor 10 and elevator-2 idle at floor 3, someone is on the 1st floor and requests
// the 6th floor, elevator-2 should be sent. 
// 2 minutes later, someone else is on the 3rd floor and requests the 5th floor. Elevator-2 should be sent.
// Finally, a third person is on floor 9 and wants to go down to the 2nd floor. Elevator-1 should be sent




// Scenario 3: With elevator-1 idle (Inactiv) at floor 10 and elevator-2 moving from floor 3 to floor 6, someone is on floor 3 and 
// requests the 2nd floor. Elevator-1 should be sent. 
// 5 minutes later, someone else is on the 10th floor and wants to go down to the 3rd floor. Elevator-2 should be sent.
