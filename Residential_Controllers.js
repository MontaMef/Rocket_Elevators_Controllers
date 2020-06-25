

// JavaScript-File-Name: Residential_Controllers.js    Date: 26-06-2020.       Programed-By: Montasser EL Ferjani.
// This Program Is Based On The Algorithm Of Residential_Controllers.algo.
// To Run Scenarios Click On Run / Run Without Debugging / Node.js / Choose DEBUG CONSOLE (Below).
// Note: Node.js Should Be Installed. 


//  1st PART: Objects AND Arrays.

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
        this.Elevator = [Elevator, Elevator];
        this.alarm = ["Problem", "NoProblem"];
    }
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

// Method 1: RequestElevator: Using: CurrentFloor And Direction.

 
function RequestElevator(CurrentFloor,Direction) {

    var BestElevator = MyColumn.Elevator[0];
    var BestDistance = Math.abs(MyColumn.Elevator[0].position - CurrentFloor);
    for (var i=1; i<MyColumn.Elevator.length; i++  ){
        
        if(Math.abs(MyColumn.Elevator[i].position - CurrentFloor)<BestDistance){
            
            if((MyColumn.Elevator[i].position < CurrentFloor && Direction === "UP") || (MyColumn.Elevator[i].position > CurrentFloor && Direction === "DOWN") ){
                
                if((MyColumn.Elevator[i].status === "Inactive") || (MyColumn.Elevator[i].status === "Active"  && MyColumn.Elevator[i].direction === Direction ) ){

                    BestElevator = MyColumn.Elevator[i];
                    BestDistance = Math.abs(MyColumn.Elevator[i].position - CurrentFloor);
                }
            }
            if( CurrentFloor === 1 ){
                
                if((MyColumn.Elevator[i].status === "Inactive") ||(MyColumn.Elevator[i].status === "Active"  && Column.Elevator[i].direction != Direction ) ){

                    BestElevator = MyColumn.Elevator[i];
                    BestDistance = Math.abs(MyColumn.Elevator[i].position - CurrentFloor);
                }
            } 
        };
    };
    console.log("RESULTS OF SCENARIO:");
    console.log("   The Best Elevator Is:",BestElevator.id + 1,".");
    console.log("   The Best Elevator Position:",BestElevator.position,"Floor.");
    console.log("   The Best Distance Is:",BestDistance,"Level(s).");
   // return BestElevator;

   // Check Alarm Status:
   if(Column.alarm === "Problem"){
        BestElevator.status === "Out Of Service";
        log.console("Elevator Is Out Of Service");
    }

    // Move Best Elevator To Current Floor
    while((CurrentFloor-BestElevator.position) > 0){
        BestElevator.position ++;
          
    }

    while((CurrentFloor-BestElevator.position) < 0){
        BestElevator.position --; 
    } 

    BestElevator.Doors ===  "Opened";
    console.log("   STEP 1: The Best Elevator Moved To Current Floor: Floor nbr",BestElevator.position,".");
    

}


// Method 2: RequestFloor: Using DemandFloor AND CurrentFloor. 

function RequestFloor (CurrentFloor,Destination,BestElevator){

    while((Destination - CurrentFloor) > 0){
        CurrentFloor++;  
    }

    while((Destination - CurrentFloor) < 0){
        CurrentFloor--;  
    }

    console.log("   STEP 2: The Best Elevator reaches the Demand Floor:",CurrentFloor );
}







//--------------------------------------------------------------  TESTING PROGRAM ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------

// Scenario 1: With elevator-1 Idle (Inactiv) at floor 2 and elevator-2  Idle at floor 6, someone is on floor 3 and requests 
// the 7th floor, elevator-1 is expected to be sent.

var Elevator1 =  new Elevator(0,2, "Inactive", 900, "Closed","UP" );
var Elevator2 =  new Elevator(1,6, "Inactive", 900, "Closed","DOWN" ); 

var MyColumn = new Column ([Elevator1,Elevator2],"NoProblem");


var CurrentFloor = 3;
var Direction = "UP";

console.log(RequestElevator (CurrentFloor, Direction));

var Destination = 7;

console.log(RequestFloor (CurrentFloor,Destination));






// Scenario 2: With elevator-1 idle (Inactiv) at floor 10 and elevator-2 idle at floor 3, someone is on the 1st floor and requests
// the 6th floor, elevator-2 should be sent. 
// 2 minutes later, someone else is on the 3rd floor and requests the 5th floor. Elevator-2 should be sent.
// Finally, a third person is on floor 9 and wants to go down to the 2nd floor. Elevator-1 should be sent






// Scenario 3: With elevator-1 idle (Inactiv) at floor 10 and elevator-2 moving from floor 3 to floor 6, someone is on floor 3 and 
// requests the 2nd floor. Elevator-1 should be sent. 
// 5 minutes later, someone else is on the 10th floor and wants to go down to the 3rd floor. Elevator-2 should be sent.
