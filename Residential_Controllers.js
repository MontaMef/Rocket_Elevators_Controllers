
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
                Text("Weight is exceeding the capacity of elevator", 10, 10);
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




//  Functions: // Functions will be later regrouped under two classes RequestElevator AND RequestFloor

function FindBestElevator(CurrentFloor,Direction){
    var BestElevator = MyColumn.Elevator[0];
    var BestDistance = Math.abs(MyColumn.Elevator[0].position - CurrentFloor);
    for (var i=1; i<MyColumn.Elevator.length; i++  ){
        if(Math.abs(MyColumn.Elevator[i].position - CurrentFloor)<BestDistance){
            if((MyColumn.Elevator[i].status === "Inactive") ||(MyColumn.Elevator[i].status === "Active"  && MyColumn.Elevator[i].direction === Direction ) ){

                BestElevator = MyColumn.Elevator[i];
                BestDistance = Math.abs(MyColumn.Elevator[i].position - CurrentFloor);
            }
        };
    };
    console.log("The Best Elevator Is: ",BestElevator.id + 1);
    return BestElevator, BestDistance;
    
}

function CheckAlarmStatus (){
    
}

// Main program

//var CurrentFloor = prompt("Enter please the Current Floor:");
//var Direction = prompt("Enter the direction of your destination (Up Or Down):");
//RequestFloor (CurrentFloor, Direction);

//var RequestFloor = prompt("Enter the request Floor (1 to 10 ):");
//RequestElevator (CurrentFloor,RequestFloor);


//Test Program





console.log(FindBestElevator(0,"UP"));

