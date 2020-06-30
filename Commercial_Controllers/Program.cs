using System;
using System.Collections.Generic;

namespace Commercial_Controllers
{   
    // Elevator Object
    public class Elevator {
        // Parameters
        public int id;
        public int position;
        public string status;
        public int weight;
        public string door;


        // Constructor Function
        public Elevator (int id, int position, string status, int weight, string door){   

            this.id = id;
            this.position= position;
            this.status = status;
            this.weight = weight;
            this.door = door;
        }

         // Move Best Elevator To First Floor
        public void MoveElevatorToFirstFloor(int FirstFloor){

            while( this.position  >1){

                this.position --; 
            }

            while((this.position) < 1){

                this.position ++; 
            } 

            this.door = "OPEN";
            Console.WriteLine("       STEP 1: The Best Elevator Moves To First Floor.");
        }

        
        // Move Elevator From First Floor To Destination (Request Floor)
        public void MoveElevatorToDestination(int Destination){
            while((Destination - this.position) > 0){
            
                this.position ++ ; 
            }

            while((Destination - this.position) < 0){
                
                this.position -- ;  
            }
            this.door = "OPEN";
            Console.WriteLine("       STEP 2: The Best Elevator reaches the Request Floor: Floor Nbr", this.position );
        }
       
        // Move Elevator To Current Floor ( Go Back To First Floor)
        public void MoveElevatorToCurrentFloor(int CurrentFloor){
             while((CurrentFloor - this.position) > 0){
            
                this.position ++ ; 
            }

            while((CurrentFloor - this.position) < 0){
                
                this.position -- ;     
            }
            this.door = "OPEN";
            Console.WriteLine("       STEP 2: The Best Elevator reaches the Current Floor:", this.position );
        }

        // Check Elevator Weight (Should be less than 2000 kg)
        public void CheckWeight(int weight){
            if (this.weight >= 2000) {
                Console.Writeline("Weight is exceeding the capacity of elevator");
                this.status = "Out Of Service";
            }
            this.door = "CLOSE";
        }

        

    }

    // Battery Object
    public class Battery {

        //Parameters
        public int NbrFloor;
        public int NbrBasements;
        public int NbrColumn;
        public list < Column > columns;

        //Constructor
        public Battery(int NbrFloor, int NbrBasements, int NbrColumn){

            this.NbrColumn    = NbrColumn;
            this.NbrFloor     = NbrFloor;
            this.NbrBasements = NbrBasements;
            this.NbrFLoorsPerColumn = (NbrFloor - NbrBasements)/(NbrColumn - 1);
            this.columns      = List<Column>();
        }

        // Find Best Column: When User Chooses the Request Floor From The Outside Panel In First Floor. Controller Searches The Best column
        public Column FindBestColumn(int Destination){

           if(Destination < 0){
               return this.Column[0];         // To Find The Best column For Floors < 0.
           }
           else{
               int IdColumn = Math.Round(Destination/this.NbrFLoorsPerColumn);  // To Find The Best column For Floors > 0.
               return this.Column[IdColumn];
           } 
               
           
           
            //var Column0 = new list <int> {1,-1,-2,-3,-4,-5,-6 };
            
            //var Column1 =  new list <int> {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20};
           // var Column2 =  new list <int> {1,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40};
           // var Column3 =  new list<int> {1,41,42,43,44,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60};

           // var BestColumn = Battery.Column[0];

            }
           


    }


    // Column Object
    public class Column {
        
        //Paramters
        public list < Elevator > elevators;
        public int NbrElevator;
        public string alarm;

        //Constructor
        public Column(int NbOfElevator, string alarm){
            
            this.elevators    = new list<elevator>();
            this.NbrElevator = NbrElevator;
            this.alarm        = alarm;
        }

        public void CheckAlarm(string alarm){
            
            if(this.alarm = "Problem"){
                this.status = "Out Of Service";
                Console.WriteLine("Elevator Is Out Of Service");
            
            }
        }

        
        // Find The Best Elevator In THe Best Column.
        public Elevator FindBestElevator(int CurrentFloor){

            BestElevator = this.Elevators[0];
            var BestDistance = Math.abs(MyColumn.Elevators[0].position - CurrentFloor);
            for (var i=1; i<MyColumn.Elevators.length; i++  ){
        
                if(MyColumn.Elevators[i].status == "Active" && BestElevator.status == "Inactive"){
                    BestElevator = MyColumn.Elevators[i];
                    BestDistance = Math.abs(MyColumn.Elevators[i].position - CurrentFloor);
                }
                
                else if((Math.abs(MyColumn.Elevators[i].position - CurrentFloor)<BestDistance)){
                    
                    if(MyColumn.Elevators[i].status == "Inactive"  &&  BestElevator.status == "Inactive") {
                        BestElevator = MyColumn.Elevators[i];
                        BestDistance = Math.abs(MyColumn.Elevators[i].position - CurrentFloor);
                        
                    }
                    if((MyColumn.Elevators[i].status == "Active"  &&  BestElevator.status =="Active")  &&  (MyColumn.Elevators[i].position < CurrentFloor && Direction == "UP") || (MyColumn.Elevators[i].position > CurrentFloor && Direction == "DOWN")){

                        BestElevator = MyColumn.Elevators[i];
                        BestDistance = Math.abs(MyColumn.Elevators[i].position - CurrentFloor);
                    }
                }

                
                if( CurrentFloor ==1 ){
                        
                    if((MyColumn.Elevators[i].status == "Active"  && MyColumn.Elevators[i].direction != Direction ) || (MyColumn.Elevators[i].status == "Inactive") ){

                        BestElevator = MyColumn.Elevators[i];
                        BestDistance = Math.abs(MyColumn.Elevators[i].position - CurrentFloor);
                    }
                }  
            }
        }
        
    }


   

   
    class Program
    {   
        // Method1: Request Elevator. This method represents an elevator request ( From First Floor RC) on a floor or basement.  
        public RequestElevator(int FloorNumber){

        }  

        // Method2: Assign Elevator. This method will be used for the requests made on the first floor.  
        public AssignElevator( int RequestedFloor){

        }

        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
