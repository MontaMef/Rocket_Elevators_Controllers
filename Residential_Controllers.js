
// When a User Push a Call-Button The Following Informations Will Be Available: CurrentFloor [The Location Of The User] AND Direction.
// 1- Constructor Function.
// Objects AND Arrays

// Constructor Function Of Elevator

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
    

// Constructor Function Column

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



// Initial Scenario For Elevator1, Elevator2 AND MyColumn:

var Elevator1 =  new Elevator(0,2, "Active", 900, "Closed","UP" );
var Elevator2 =  new Elevator(1,10, "Inactive", 500, "Closed","DOWN" ); 

var MyColumn = new Column ([Elevator1,Elevator2],"NoProblem");




//  Functions: // Functions will be later regrouped under two classes or Sections RequestElevator AND RequestFloor

// The Following Functions will be classified under RequestElevator Class Or Section:

function FindBestElevator(CurrentFloor,Direction){
    var BestElevator = MyColumn.Elevator[0];
    var BestDistance = Math.abs(MyColumn.Elevator[0].position - CurrentFloor);
    for (var i=1; i<MyColumn.Elevator.length; i++  ){
        
        if(Math.abs(MyColumn.Elevator[i].position - CurrentFloor)<BestDistance){
            
            if(MyColumn.Elevator[i].position < CurrentFloor ){
                
                if((MyColumn.Elevator[i].status === "Inactive") ||(MyColumn.Elevator[i].status === "Active"  && MyColumn.Elevator[i].direction === Direction ) ){

                    BestElevator = MyColumn.Elevator[i];
                    BestDistance = Math.abs(MyColumn.Elevator[i].position - CurrentFloor);
                }
            }
            if(MyColumn.Elevator[i].position > CurrentFloor ){
                
                if((MyColumn.Elevator[i].status === "Inactive") ||(MyColumn.Elevator[i].status === "Active"  && MyColumn.Elevator[i].direction != Direction ) ){

                    BestElevator = MyColumn.Elevator[i];
                    BestDistance = Math.abs(MyColumn.Elevator[i].position - CurrentFloor);
                }
            } 
        };
    };
    
    console.log("The Best Elevator Is:",BestElevator.id + 1);
    console.log("The Best Elevator Position:",BestElevator.position,"Floor(s)");
    console.log("The Best Distance Is:",BestDistance,"Level(s)");
    return BestElevator;
    
}

function CheckAlarmStatus (){
    while(MyColumn.alarm === "Problem"){
        BestElevator.status === "Out Of Service";
        log.console("Elevator Is Out Of Service");
    }
}

function MoveToCurrentFloor(BestElevator){
   
    while((CurrentFloor-BestElevator.postion) > 0){
        BestElevator.postion++;  
    }

    while((CurrentFloor-BestElevator.postion) < 0){
        BestElevator.postion--; 
    } 

    BestElevator.Doors ===  "Opened";
    console.log("The New Position Of Best Elevator Is:",BestElevator.postion);
}

//The Following Functions will be classified under RequestFloor Class Or Section:



function MoveToDistination (CurrentFloor,Destination,BestElevator){

    if((Destination - CurrentFloor) > 0){
        BestElevator.position++;  
    }

    if((Destination - CurrentFloor) < 0){
        BestElevator.position--;  
    }

    BestElevator.doors = "Opened";
    console.log("The Best Elevator reaches the Demand Floor:",BestElevator.position);
}




//Test Program

console.log(FindBestElevator(0,"UP"));
//console.log(MoveToDistination (0,7));

