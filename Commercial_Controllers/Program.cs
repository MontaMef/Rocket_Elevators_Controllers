
// Week 3: The Mechanics of Compiled Languages . 
// C#-Project-Name: Commercial_Controllers.           C#-File-Name: Program.cs    
// Date: 03-07-2020.       Programed-By: Montasser EL Ferjani.
// This Program Is Based On The Algorithm Of Commercial_Controllers.algo.


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
        public int direction;
        public int weight;
        public string door;
        


        // Constructor Function
        public Elevator (int id, int position, string status, int direction,int weight, string door){   

            this.id = id;
            this.position= position;
            this.status = status;
            this.direction = direction;
            this.weight = weight;
            this.door = door;
        }

         // Move Best Elevator To First Floor
        public void MoveElevatorToFirstFloor(){

            while( this.position  >1){

                this.position --; 
            }

            while((this.position) < 1){

                this.position ++; 
            } 

            this.door = "OPEN";
            Console.WriteLine("The Best Elevator Moves To First Floor.");
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
            Console.WriteLine($"The Best Elevator reaches the Request Floor: Floor Nbr {this.position}" );
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
            Console.WriteLine($"The Best Elevator reaches the Current Floor: {this.position}");
        }


        // Check Elevator Weight (Should be less than 2000 kg)
        public void CheckWeight(){
            if (this.weight >= 2000) {
                Console.WriteLine("Weight is exceeding the capacity of elevator");
                this.status = "Out Of Service";
            }
            else {
                this.door = "CLOSE";
            }
        }
    }




    // Battery Object
    public class Battery {

        //Parameters
        public int NbrColumn;
        public int NbrFloor;
        public int NbrBasements;
        public List<Column> column;
        public int NbrFLoorsPerColumn;

        //Constructor
        public Battery (int NbrColumn, int NbrFloor, int NbrBasements){

            this.NbrColumn    = NbrColumn;
            this.NbrFloor     = NbrFloor;
            this.NbrBasements = NbrBasements;
            this.NbrFLoorsPerColumn = (NbrFloor - NbrBasements)/(NbrColumn - 1);
            this.column = new List<Column>();
            for (int i = 0 ; i < this.NbrColumn  ; i++ ) {
                this.column.Add (new Column(5,"OK"));
            }
        }    

        // Find Best Column: When User Chooses the Request Floor From The Outside Panel In First Floor. Controller Searches The Best column
        public int FindBestColumn(int Destination){

            if(Destination < 0){
                Console.WriteLine("The Best Column Is Column:0");
                return 0;         // To Find The Best column For Floors < 0.
            }
            else{
                Decimal a = Destination/this.NbrFLoorsPerColumn;
                int IdColumn = Convert.ToInt32(Math.Round(a));  // To Find The Best column For Floors > 0.
                Console.WriteLine($"The Best Column Is Column: {IdColumn + 1}"); // Add Always +1 Because Index Starts From 0.
                return IdColumn;
                        
            } 
            
        }
    }
    


    // Column Object
    public class Column {
        
        //Paramters
        public List < Elevator > elevator;
        public int NbrElevator;
        public string alarm;

        //Constructor
        public Column(int NbrElevator, string alarm){
            
            this.NbrElevator = NbrElevator;
            this.alarm        = alarm;
            this.elevator = new List <Elevator>(); 
            for (int i = 0 ; i < NbrElevator ; i++ ) {
                Elevator elev = new Elevator(i,1,"Inactive",0,0,"Closed");
                this.elevator.Add(elev);
            }
        }

        public void CheckAlarm(){
            
            if(this.alarm == "Problem"){
                
                Console.WriteLine("Elevator Is Out Of Service");
            }
        }

        
        // Find The Best Elevator In THe Best Column.
        public Elevator FindBestElevator(int CurrentFloor){

            Elevator BestElevator = this.elevator[0];
            Decimal a =Math.Abs(this.elevator[0].position - CurrentFloor);
            int BestDistance = Convert.ToInt32(a);
            for (var i=1; i < this.elevator.Count; i++  ){
        
                if(this.elevator[i].status == "Active" && BestElevator.status == "Inactive"){
                    BestElevator = this.elevator[i];
                    BestDistance = Math.Abs(this.elevator[i].position - CurrentFloor);
                }
                
                else if((Math.Abs(this.elevator[i].position - CurrentFloor)<BestDistance)){
                    
                    if(this.elevator[i].status == "Inactive"  &&  BestElevator.status == "Inactive") {
                        BestElevator = this.elevator[i];
                        BestDistance = Math.Abs(this.elevator[i].position - CurrentFloor);
                        
                    }
                    if(this.elevator[i].status == "Active"  &&  BestElevator.status =="Active" &&  (this.elevator[i].position < CurrentFloor && this.elevator[i].direction - this.elevator[i].position > 0) || (this.elevator[i].position > CurrentFloor && this.elevator[i].direction - this.elevator[i].position < 0)){

                        BestElevator = this.elevator[i];
                        BestDistance = Math.Abs(this.elevator[i].position - CurrentFloor);
                    }
                }
            }
            Console.WriteLine($"The Best Elevator is Elevator Nbr: {BestElevator.id}");
            return BestElevator;
        }
    }


   

   
    class Program
    {   
        // Main Methods ---------------------------------------------------------------------------------------------------------------------

        // Method 1: Request Elevator. This method represents an elevator request ( From First Floor RC) on a floor or basement.  
        public void RequestElevator(int CurrentFloor, int Destination,Battery Battery ,int IdBestColumn){
           // Battery Battery = new Battery();
            Elevator BestElevator = Battery.column[IdBestColumn].FindBestElevator(CurrentFloor);
            Battery.column[IdBestColumn].CheckAlarm();
            BestElevator.MoveElevatorToFirstFloor();
            BestElevator.CheckWeight();
            BestElevator.MoveElevatorToDestination(Destination);
            //return BestElevator;        // To Avoid erreur Method should return 
        }  

        // Method 2: Assign Elevator. This method will be used for the requests made on the first floor.  
        public void AssignElevator( int CurrentFloor){
            //int BestColumn   = Battery.FindBestColumn(1);
           // Elevator BestElevator = BestColumn.FindBestElevator(CurrentFloor);
           // BestColumn.CheckAlarm();
           // BestElevator.MoveElevatorToCurrentFloor(CurrentFloor);
           // BestElevator.CheckWeight();
           // BestElevator.MoveElevatorToFirstFloor();
            //return BestElevator;     // To Avoid erreur Method should return
        }

        // Scenarios Functions ---------------------------------------------------------------------------------------------------------------

        public void Scenario1(){
            
            Console.WriteLine("Scenario 1:");
           
            Battery Battery  = new Battery(4,66,6);
            int CurrentFloor = 1;
            int Destination  = 20;
            int IdBestColumn = Battery.FindBestColumn(Destination);
            Battery.column[IdBestColumn] = new Column(5,"OK");

            Battery.column[IdBestColumn].elevator[0] = new Elevator(1,20,"Active",5,1000,"Closed");
            Battery.column[IdBestColumn].elevator[1] = new Elevator(2,3,"Active",15,1000,"Closed");
            Battery.column[IdBestColumn].elevator[2] = new Elevator(3,13,"Active",1,1000,"Closed");
            Battery.column[IdBestColumn].elevator[3] = new Elevator(4,15,"Active",2,1000,"Closed");
            Battery.column[IdBestColumn].elevator[4] = new Elevator(5,6,"Active",1,1000,"Closed");

            
            RequestElevator(CurrentFloor,Destination,Battery,IdBestColumn);

        }
        

        // Testing Scenarios -----------------------------------------------------------------------------------------------------------------
        static void Main(string[] args)
        {
            // Scenario 1:
            // With second column (or column B) serving floors from 2 to 20, with elevator B1 at 20th floor going to 5th,
            // B2 at 3rd floor going to 15th, B3 at 13th floor going to 1st, B4 at 15th floor going to 2nd, and B5 at 6th floor going to 1st,
            // someone is at 1st floor and requests the 20th floor, elevator B5 is expected to be sent 
            Program SC = new Program();
            
            SC.Scenario1 ();

            

            


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
 
            
        }
    }
}
