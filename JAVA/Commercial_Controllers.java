


public class Commercial_Controllers {

    //Elevator Object
    public class Elevator {
        // Parameters
        public int id;
        public int position;
        public String status;
        public int direction;
        public int weight;
        public String door;
        


        //Constructor Function
        public Elevator (int id, int position, String status, int direction,int weight, String door){   

            this.id = id;
            this.position= position;
            this.status = status;
            this.direction = direction;
            this.weight = weight;
            this.door = door;
        }

         //Move Best Elevator To First Floor
        public void MoveElevatorToFirstFloor(){

            while( this.position  > 1){

                this.position --; 
            }

            while((this.position) < 1){

                this.position ++; 
            } 
            this.door = "OPEN";
            System.out.println("    The Best Elevator Moves To First Floor.(Best Elevator New Position:"+ this.position);
        }

        
        //Move Elevator From First Floor To Destination (Request Floor)
        public void MoveElevatorToDestination(int Destination){
            while((Destination - this.position) > 0){
            
                this.position ++ ; 
            }

            while((Destination - this.position) < 0){
                
                this.position -- ;  
            }
            this.door = "OPEN";
            System.out.println("    The Best Elevator reaches the Request Floor: Floor Nbr:"+this.position );
        }
       
        //Move Elevator To Current Floor ( Go Back To First Floor)
        public void MoveElevatorToCurrentFloor(int CurrentFloor){
             while((CurrentFloor - this.position) > 0){
            
                this.position ++ ; 
            }

            while((CurrentFloor - this.position) < 0){
                
                this.position -- ;     
            }
            this.door = "OPEN";
            System.out.println("    The Best Elevator reaches the Request Floor: Floor Nbr:"+this.position );
        }


        //Check Elevator Weight (Should be less than 2000 kg)
        public void CheckWeight(){
            if (this.weight >= 2000) {
                System.out.println(" Weight is exceeding the capacity of elevator");
                this.status = "Out Of Service";
            }
            else {
                this.door = "CLOSE";
            }
        }
    }


    //Column Object
    public class Column {
        
        //Paramters
        //public List < Elevator > elevator;
        //public Array <Elevator> elevator;
        public int NbrElevator;
        public Elevator elevator[];
        public String alarm;

        //Constructor
        public Column(int NbrElevator, String alarm){
            
            this.NbrElevator = NbrElevator;
            this.alarm        = alarm;
            this.elevator =  new Elevator[NbrElevator]; 
            for (int i = 0 ; i < NbrElevator ; i++ ) {
                Elevator elev = new Elevator(i,1,"Inactive",0,0,"Closed");
                this.elevator[i] = elev;
            }
        }

        public void CheckAlarm(){
            
            if(this.alarm == "Problem"){
                
                System.out.println("Elevator Is Out Of Service");
            }
        }

        
        //Find The Best Elevator In THe Best Column.
        public Elevator FindBestElevator(int CurrentFloor, int Destination){

            Elevator bestElevator = this.elevator[0];
            int a = Math.abs(this.elevator[0].position - CurrentFloor);
            int bestDistance = a;
            for (var i=1; i < this.elevator.length; i++  ){
        
                if(this.elevator[i].status == "Active" && bestElevator.status == "Inactive"){
                    bestElevator = this.elevator[i];
                    bestDistance = Math.abs(this.elevator[i].position - CurrentFloor);
                }
                
                else if(this.elevator[i].status == "Active"  &&  bestElevator.status =="Active"){
                        
                    if((Destination > CurrentFloor) && (this.elevator[i].direction > this.elevator[i].position) && (this.elevator[i].position < CurrentFloor) && (Math.abs(this.elevator[i].position - CurrentFloor) < bestDistance) ) {

                        
                        bestElevator = this.elevator[i];
                        bestDistance = Math.abs(this.elevator[i].position - CurrentFloor);
                    }
                    else if ((Destination < CurrentFloor) && (this.elevator[i].direction < this.elevator[i].position) && (this.elevator[i].position > CurrentFloor) && (Math.abs(this.elevator[i].position - CurrentFloor) < bestDistance)) {

                        bestElevator = this.elevator[i];
                        bestDistance = Math.abs(this.elevator[i].position - CurrentFloor);
                    }
                }   
                
                else if((this.elevator[i].status == "Inactive"  &&  bestElevator.status == "Inactive") && (Math.abs(this.elevator[i].position - CurrentFloor) < bestDistance)) {
                    
                    bestElevator = this.elevator[i];
                    bestDistance = Math.abs(this.elevator[i].position - CurrentFloor);
                        
                }
                    
                   
                
            }
            System.out.println("    The Best Elevator Is Elevator Nbr:" + bestElevator.id);
            System.out.println("    The Best Elevator Position: Floor Nbr" +bestElevator.position);
            return bestElevator;
        }
    }



    //Battery Object
    public class Battery {

        //Parameters
        public int NbrColumn;
        public int NbrFloor;
        public int NbrBasements;
        public Column column[];
        public int NbrFLoorsPerColumn;

        //Constructor
        public Battery (int NbrColumn, int NbrFloor, int NbrBasements){

            this.NbrColumn    = NbrColumn;
            this.NbrFloor     = NbrFloor;
            this.NbrBasements = NbrBasements;
            this.NbrFLoorsPerColumn = (NbrFloor - NbrBasements)/(NbrColumn - 1);
            this.column = new Column[NbrColumn];
            for (int i = 0 ; i < this.NbrColumn  ; i++ ) {
                this.column[i] = new Column(5,"OK");
            }
        }    

        //Main Methods ---------------------------------------------------------------------------------------------------------------------

        // Method 1: Request Elevator. This method represents an elevator request ( From First Floor RC) on a floor or basement.  
        public void RequestElevator(int Destination){
            Column bestColumn = this.FindBestColumn(Destination);
            Elevator bestElevator = bestColumn.FindBestElevator(1,Destination);
            bestColumn.CheckAlarm();
            bestElevator.MoveElevatorToFirstFloor();
            bestElevator.CheckWeight();
            bestElevator.MoveElevatorToDestination(Destination);
            
        }

        //Method 2: Assign Elevator. This method will be used for the requests made on the first floor (RC).  
        public void AssignElevator( int CurrentFloor){
            Column bestColumn   = this.FindBestColumnReturn(CurrentFloor);
            Elevator bestElevator = bestColumn.FindBestElevator(CurrentFloor,1);
            bestColumn.CheckAlarm();
            bestElevator.MoveElevatorToCurrentFloor(CurrentFloor);
            bestElevator.CheckWeight();
            bestElevator.MoveElevatorToFirstFloor();
        }

        //Find Best Column: When User Chooses the Request Floor From The Outside Panel In First Floor. Controller Searches The Best column
        public Column FindBestColumn(int Destination){

            if(Destination < 0){
                System.out.println("    The Best Column Is Column: 1");
                return this.column[0];         
            }
            else if (Destination > 0 && Destination < 21){
                
                System.out.println("    The Best Column Is Column:2");  
                return this.column[1];        
            } 

            else if (Destination > 20 && Destination < 41){
                
                System.out.println("    The Best Column Is Column:3");  
                return this.column[2];        
            } 

            else{
                
                System.out.println("    The Best Column Is Column:4");  
                return this.column[3]; 
            }
 
        }
        //Find Best Coulmn To Return To The First Floor
        public Column FindBestColumnReturn(int CurrentFloor){

            if( CurrentFloor < 0){
                System.out.println("    The Best Column Is Column: 1");
                return this.column[0];         
            }

            else if (CurrentFloor > 0 && CurrentFloor < 21){
               
                System.out.println("    The Best Column Is Column: 2");  
                return this.column[1];        
            } 

            else if (CurrentFloor > 20 && CurrentFloor < 41){
                
                System.out.println("    The Best Column Is Column: 3");  
                return this.column[2];        
            } 

            else{
                
                System.out.println("    The Best Column Is Column: 4");  
                return this.column[3]; 
            }

        }



        

    }

    // Scenarios Functions ---------------------------------------------------------------------------------------------------------------
    //Scenario 1:
    public void Scenario1(Battery battery1){

            System.out.println("");
            System.out.println("Scenario 1:");
            System.out.println("");

            int Destination  = 20;
            
            battery1.column[1].elevator[0] = new Elevator(1,20,"Active",5,1000,"Closed");
            battery1.column[1].elevator[1] = new Elevator(2,3,"Active",15,1000,"Closed");
            battery1.column[1].elevator[2] = new Elevator(3,13,"Active",1,1000,"Closed");
            battery1.column[1].elevator[3] = new Elevator(4,15,"Active",2,1000,"Closed");
            battery1.column[1].elevator[4] = new Elevator(5,6,"Active",1,1000,"Closed");

            battery1.RequestElevator(Destination);
            System.out.println("");
    }
        
    // Scenario 2:
    public void Scenario2(Battery battery2){

            System.out.println("");
            System.out.println("Scenario 2:");
            System.out.println("");

            int Destination  = 40;
            
            battery2.column[2].elevator[0] = new Elevator(1,1,"Active",21,1000,"Closed");
            battery2.column[2].elevator[1] = new Elevator(2,23,"Active",28,1000,"Closed");
            battery2.column[2].elevator[2] = new Elevator(3,33,"Active",1,1000,"Closed");
            battery2.column[2].elevator[3] = new Elevator(4,40,"Active",24,1000,"Closed");
            battery2.column[2].elevator[4] = new Elevator(5,39,"Active",1,1000,"Closed"); 

            battery2.RequestElevator(Destination);
            System.out.println("");
    }

    // Scenario 3:
    public void Scenario3(Battery battery3){

            System.out.println("");
            System.out.println("Scenario 3:");
            System.out.println("");

            int CurrentFloor  = 54;
            
            battery3.column[3].elevator[0] = new Elevator(1,58,"Active",1,1000,"Closed");
            battery3.column[3].elevator[1] = new Elevator(2,50,"Active",60,1000,"Closed"); 
            battery3.column[3].elevator[2] = new Elevator(3,46,"Active",58,1000,"Closed");
            battery3.column[3].elevator[3] = new Elevator(4,40,"Active",24,1000,"Closed");
            battery3.column[3].elevator[4] = new Elevator(5,60,"Active",1,1000,"Closed");
   

            battery3.AssignElevator(CurrentFloor);
            System.out.println("");
    }

    // Scenario 4:
    public void Scenario4(Battery battery4){

            System.out.println("");
            System.out.println("Scenario 4:");
            System.out.println("");

            int CurrentFloor  = -3;
            
            battery4.column[0].elevator[0] = new Elevator(1,-4,"Inactive",-4,1000,"Closed");
            battery4.column[0].elevator[1] = new Elevator(2,1,"Inactive",1,1000,"Closed");
            battery4.column[0].elevator[2] = new Elevator(3,-3,"Active",-5,1000,"Closed");
            battery4.column[0].elevator[3] = new Elevator(4,-6,"Active",1,1000,"Closed");
            battery4.column[0].elevator[4] = new Elevator(5,-1,"Active",-6,1000,"Closed");    

            battery4.AssignElevator(CurrentFloor);
            System.out.println("");
    }


    public static void main(String[] args) {


        Commercial_Controllers SC = new Commercial_Controllers();

        // Scenario 1:
        // With second column (or column B) serving floors from 2 to 20, with elevator B1 at 20th floor going to 5th,
        // B2 at 3rd floor going to 15th, B3 at 13th floor going to 1st, B4 at 15th floor going to 2nd, and B5 at 6th floor going to 1st,
        // someone is at 1st floor and requests the 20th floor, elevator B5 is expected to be sent 
           
        Battery battery1 = SC.new Battery(4,66,6);  
        SC.Scenario1(battery1);


        // Scenario 2: 
        // With third column (or column C) serving floors from 21 to 40, with elevator C1 at 1st floor going to 21th, 
        // C2 at 23st floor going to 28th, C3 at 33rd floor going to 1st, C4 at 40th floor going to 24th, and C5 at 39nd floor going to 1st,
        // someone is at 1st floor and requests the 36th floor, elevator C1 is expected to be sent 
            
        Battery battery2 = SC.new Battery(4,66,6);
        SC.Scenario2(battery2);


        // Scenario 3: 
        // With fourth column (or column D) serving floors from 41 to 60, with elevator D1 at 58th floor going to 1st, 
        // D2 at 50th floor going to 60th, D3 at 46th floor going to 58th, D4 at 1st floor going to 54th, and D5 at 60th floor going to 1st, 
        // someone is at 54th floor and requests the 1st floor, elevator D1 is expected to pick him up 
            
        Battery battery3 = SC.new Battery(4,66,6);
        SC.Scenario3(battery3);


        // Scenario 4: 
        // With first column (or Column A) serving the basements B1 to B6, with elevator A1 idle at B4, A2 idle at 1st floor,
        // A3 at B3 and going to B5, A4 at B6 and going to 1st floor, and A5 at B1 going to B6, 
        //someone is at B3 and requests the 1st floor. Elevator A4 is expected to be sent. 
            
        Battery battery4 = SC.new Battery(4,66,6);
        SC.Scenario4(battery4);
            
        
    }
    
}