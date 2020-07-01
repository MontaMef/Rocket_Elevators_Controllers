
// Week 3: The Mechanics of Compiled Languages . 
// C#-Project-Name: Commercial_Controllers.           C#-File-Name: Program.cs    
// Date: 03-07-2020.       Programed-By: Montasser EL Ferjani.
// This Program Is Based On The Algorithm Of Commercial_Controllers.algo.


using System;
using generics = System.Collections.Generic;

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
        public int NbrColumn;
        public int NbrFloor;
        public int NbrBasements;
        public list < Column > columns;

        //Constructor
        public Battery (int NbrColumn, int NbrFloor, int NbrBasements, int NbrColumn){

            this.NbrColumn    = NbrColumn;
            this.NbrFloor     = NbrFloor;
            this.NbrBasements = NbrBasements;
            this.NbrFLoorsPerColumn = (NbrFloor - NbrBasements)/(NbrColumn - 1);
            this.column     = List<Column>();
        }

        // Find Best Column: When User Chooses the Request Floor From The Outside Panel In First Floor. Controller Searches The Best column
        public Column FindBestColumn(int Destination){

           if(Destination < 0){
                return this.column[0];         // To Find The Best column For Floors < 0.
           }
           else{
                int IdColumn = Math.Round(Destination/this.NbrFLoorsPerColumn);  // To Find The Best column For Floors > 0.
                return this.column[IdColumn];
                
           } 
           Console.WriteLine("The Best Column Is Column:",this.column);
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
            var BestDistance = Math.abs(this.Elevators[0].position - CurrentFloor);
            for (var i=1; i < this.Elevators.length; i++  ){
        
                if(this.Elevators[i].status == "Active" && BestElevator.status == "Inactive"){
                    BestElevator = this.Elevators[i];
                    BestDistance = Math.abs(this.Elevators[i].position - CurrentFloor);
                }
                
                else if((Math.abs(this.Elevators[i].position - CurrentFloor)<BestDistance)){
                    
                    if(this.Elevators[i].status == "Inactive"  &&  BestElevator.status == "Inactive") {
                        BestElevator = this.Elevators[i];
                        BestDistance = Math.abs(this.Elevators[i].position - CurrentFloor);
                        
                    }
                    if((this.Elevators[i].status == "Active"  &&  BestElevator.status =="Active")  &&  (this.Elevators[i].position < CurrentFloor && Direction == "UP") || (this.Elevators[i].position > CurrentFloor && Direction == "DOWN")){

                        BestElevator = this.Elevators[i];
                        BestDistance = Math.abs(this.Elevators[i].position - CurrentFloor);
                    }
                }

                if( CurrentFloor ==1 ){
                        
                    if((this.Elevators[i].status == "Active"  && this.Elevators[i].direction != Direction ) || (this.Elevators[i].status == "Inactive") ){

                        BestElevator = this.Elevators[i];
                        BestDistance = Math.abs(this.Elevators[i].position - CurrentFloor);
                    }
                }  
            }
            Console.WriteLine("The Best Elevator is Elevator Nbr:", BestElevator);
        }
    }


   

   
    class Program
    {   
        // Main Methods ---------------------------------------------------------------------------------------------------------------------

        // Method 1: Request Elevator. This method represents an elevator request ( From First Floor RC) on a floor or basement.  
        public Elevator RequestElevator(int FloorNumber){

            var BestColumn   = Battery.FindBestColumn();
            var BestElevator = BestColumn.FindBestElevator();
            BestColumn.CheckAlarm();
            BestElevator.MoveElevatorToFirstFloor();
            BestElevator.CheckWeight();
            BestElevator.MoveElevatorToDestination();
            return BestElevator;        // To Avoid erreur Method should return 
        }  

        // Method 2: Assign Elevator. This method will be used for the requests made on the first floor.  
        public Elevator AssignElevator( int Destination, int BestColumn){
            var BestColumn   = Battery.FindBestColumn();
            var BestElevator = BestColumn.FindBestElevator();
            BestColumn.CheckAlarm();
            BestElevator.MoveElevatorCurrenttFloor();
            BestElevator.CheckWeight();
            BestElevator.MoveElevatorToFirstFloor();
            return BestElevator;     // To Avoid erreur Method should return
        }
        

        // Testing Scenarios -----------------------------------------------------------------------------------------------------------------
        static void Main(string[] args)
        {
            // Scenario 1:
            // With second column (or column B) serving floors from 2 to 20, with elevator B1 at 20th floor going to 5th,
            // B2 at 3rd floor going to 15th, B3 at 13th floor going to 1st, B4 at 15th floor going to 2nd, and B5 at 6th floor going to 1st,
            // someone is at 1st floor and requests the 20th floor, elevator B5 is expected to be sent 

            

            


            // Scenario 2: 
            // With third column (or column C) serving floors from 21 to 40, with elevator C1 at 1st floor going to 21th, 
            // C2 at 23st floor going to 28th, C3 at 33rd floor going to 1st, C4 at 40th floor going to 24th, and C5 at 39nd floor going to 1st,
            // someone is at 1st floor and requests the 36th floor, elevator C1 is expected to be sent 


            // Scenario 3: 
            // With fourth column (or column D) serving floors from 41 to 60, with elevator D1 at 58th floor going to 1st, 
            // D2 at 50th floor going to 60th, D3 at 46th floor going to 58th, D4 at 1st floor going to 54th, and D5 at 60th floor going to 1st, 
            // someone is at 54th floor and requests the 1st floor, elevator D1 is expected to pick him up 


            // Scenario 4: 
            // With first column (or Column A) serving the basements B1 to B6, with elevator A1 idle at B4, A2 idle at 1st floor,
            // A3 at B3 and going to B5, A4 at B6 and going to 1st floor, and A5 at B1 going to B6, someone is at B3 and requests the 1st floor.
            // Elevator A4 is expected to be sent. 
 
            Console.WriteLine("Hello World!");
        }
    }
}
