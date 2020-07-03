// Week 3: The Mechanics of Compiled Languages .
// GoLang-File-Name: Commercial_Controllers.
// Date: 03-07-2020.       Programed-By: Montasser EL Ferjani.
// This Program Is Based On The Algorithm Of Commercial_Controllers.algo.

package main

import (
	"fmt"
)

// Elevator type
type Elevator struct {
	id        int
	position  int
	status    string
	direction int
	weight    int
	door      string
}

//NewElevator NewElevator Constructor
func NewElevator(id int, position int, status string, direction int, weight int, door string) Elevator {

	var m Elevator
	m.id = id
	m.position = position
	m.status = status
	m.direction = direction
	m.weight = weight
	m.door = door
	return m
}

//MoveElevatorToFirstFloor Move Best Elevator To First Floor
func (m Elevator) MoveElevatorToFirstFloor() {

	for m.position > 1 {

		m.position--
	}

	for m.position < 1 {

		m.position++
	}

	m.door = "OPEN"

	fmt.Println("    The Best Elevator Moves To First Floor.Best Elevator New Position:", m.position)

	//return m.position
}

//MoveElevatorToDestination Move Elevator From First Floor To Destination (Request Floor)
func (m Elevator) MoveElevatorToDestination(Destination int) {

	for Destination-m.position > 0 {

		m.position++
	}

	for Destination-m.position < 0 {

		m.position--
	}
	m.door = "OPEN"
	fmt.Println("    The Best Elevator reaches the Request Floor: Floor Nbr", m.position)

	//return m.position
}

//MoveElevatorToCurrentFloor Move Elevator To Current Floor ( Go Back To First Floor)
func (m Elevator) MoveElevatorToCurrentFloor(CurrentFloor int) {
	for CurrentFloor-m.position > 0 {

		m.position++
	}

	for CurrentFloor-m.position < 0 {

		m.position--
	}
	m.door = "OPEN"
	fmt.Println("    The Best Elevator reaches the Current Floor:", m.position)

	//return m.position
}

//CheckWeight Check Elevator Weight (Should be less than 2000 kg)
func (m Elevator) CheckWeight() {

	if m.weight >= 2000 {
		fmt.Println(" Weight is exceeding the capacity of elevator")
		m.status = "Out Of Service"
	} else {
		m.door = "CLOSE"

	}
	//return m.status
}

// Battery type
type Battery struct {
	NbrColumn          int
	NbrFloor           int
	NbrBasements       int
	column             []Column
	NbrFLoorsPerColumn int
}

//NewBattery Constructor
func NewBattery(NbrColumn int, NbrFloor int, NbrBasements int) Battery {

	var m Battery
	m.NbrColumn = NbrColumn
	m.NbrFloor = NbrFloor
	m.NbrBasements = NbrBasements
	m.NbrFLoorsPerColumn = (NbrFloor - NbrBasements) / (NbrColumn - 1)
	m.column = make([]Column, NbrColumn)
	for i := 0; i < m.NbrColumn; i++ {
		col := NewColumn(5, "ok")
		m.column[i] = col
		//m.column = append(m.column, col)
	}
	return m
}

//FindBestColumn Find Best Column: When User Chooses the Request Floor From The Outside Panel In First Floor. Controller Searches The Best column
func (m Battery) FindBestColumn(Destination int) Column {

	if Destination < 0 {
		fmt.Println("    The Best Column Is Column: 1")
		return m.column[0]

	} else if Destination > 0 && Destination < 21 {

		fmt.Println("    The Best Column Is Column:2")
		return m.column[1]

	} else if Destination > 20 && Destination < 41 {

		fmt.Println("    The Best Column Is Column:3")
		return m.column[2]

	} else {

		fmt.Println("    The Best Column Is Column:4")
		return m.column[3]
	}

}

//FindBestColumnReturn Find Best Coulmn To Return To The First Floor
func (m Battery) FindBestColumnReturn(CurrentFloor int) Column {

	if CurrentFloor < 0 {
		fmt.Println("    The Best Column Is Column: 1")
		return m.column[0]

	} else if CurrentFloor > 0 && CurrentFloor < 21 {

		fmt.Println("    The Best Column Is Column: 2")
		return m.column[1]

	} else if CurrentFloor > 20 && CurrentFloor < 41 {

		fmt.Println("    The Best Column Is Column: 3")
		return m.column[2]

	} else {

		fmt.Println("    The Best Column Is Column: 4")
		return m.column[3]
	}

}

// Main Methods ----------------------------------------------------------------------------------------------------------

//RequestElevator Method 1: Request Elevator. This method represents an elevator request ( From First Floor RC) on a floor or basement.
func (m Battery) RequestElevator(Destination int) {
	bestColumn := m.FindBestColumn(Destination)
	CurrentFloor := 1
	bestElevator := bestColumn.FindBestElevator(CurrentFloor, Destination)
	bestColumn.CheckAlarm()
	bestElevator.MoveElevatorToFirstFloor()
	bestElevator.CheckWeight()
	bestElevator.MoveElevatorToDestination(Destination)

}

//AssignElevator Method 2: Assign Elevator. This method will be used for the requests made on the first floor (RC).
func (m Battery) AssignElevator(CurrentFloor int) {
	bestColumn := m.FindBestColumnReturn(CurrentFloor)
	bestElevator := bestColumn.FindBestElevator(CurrentFloor, 1)
	bestColumn.CheckAlarm()
	bestElevator.MoveElevatorToCurrentFloor(CurrentFloor)
	bestElevator.CheckWeight()
	bestElevator.MoveElevatorToFirstFloor()

}

// Main Methods / ----------------------------------------------------------------------------------------------------------

// Column type
type Column struct {
	elevator    []Elevator
	NbrElevator int
	alarm       string
}

//NewColumn New Column Constructor
func NewColumn(NbrElevator int, alarm string) Column {
	var m Column
	var elev Elevator
	m.NbrElevator = NbrElevator
	m.alarm = alarm
	m.elevator = make([]Elevator, NbrElevator)
	for i := 0; i < m.NbrElevator; i++ {
		elev = NewElevator(i, 1, "Inactive", 0, 0, "Closed")
		m.elevator[i] = elev
	}
	return m
}

//CheckAlarm Check Alarm Status
func (m Column) CheckAlarm() {

	if m.alarm == "Problem" {

		fmt.Println("Elevator Is Out Of Service")
		//return m.alarm
	}
}

// Abs returns the absolute value of x.
func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

//FindBestElevator Find The Best Elevator In THe Best Column.
func (m Column) FindBestElevator(CurrentFloor int, Destination int) Elevator {

	bestElevator := m.elevator[0]
	a := Abs(m.elevator[0].position - CurrentFloor)
	bestDistance := a
	for i := 1; i < len(m.elevator); i++ {

		if m.elevator[i].status == "Active" && bestElevator.status == "Inactive" {
			bestElevator = m.elevator[i]
			bestDistance = Abs(m.elevator[i].position - CurrentFloor)

		} else if m.elevator[i].status == "Active" && bestElevator.status == "Active" {

			if (Destination > CurrentFloor) && (m.elevator[i].direction > m.elevator[i].position) && (m.elevator[i].position < CurrentFloor) {

				bestElevator = m.elevator[i]
				bestDistance = Abs(m.elevator[i].position - CurrentFloor)
			} else if (Destination < CurrentFloor) && (m.elevator[i].direction < m.elevator[i].position) && (m.elevator[i].position > CurrentFloor) {

				bestElevator = m.elevator[i]
				bestDistance = Abs(m.elevator[i].position - CurrentFloor)
			}

		} else if (m.elevator[i].status == "Inactive" && bestElevator.status == "Inactive") && (Abs(m.elevator[i].position-CurrentFloor) < bestDistance) {

			bestElevator = m.elevator[i]
			bestDistance = Abs(m.elevator[i].position - CurrentFloor)

		}

	}
	fmt.Println("    The Best Elevator Is Elevator Nbr:", bestElevator.id)
	fmt.Println("    The Best Elevator Position: Floor Nbr:", bestElevator.position)
	return bestElevator
}

//Scenario1 Function
func Scenario1(battery1 Battery) {

	fmt.Println("")
	fmt.Println("Scenario 1:")
	fmt.Println("")

	Destination := 20

	battery1.column[1].elevator[0] = NewElevator(1, 20, "Active", 5, 1000, "Closed")
	battery1.column[1].elevator[1] = NewElevator(2, 3, "Active", 15, 1000, "Closed")
	battery1.column[1].elevator[2] = NewElevator(3, 13, "Active", 1, 1000, "Closed")
	battery1.column[1].elevator[3] = NewElevator(4, 15, "Active", 2, 1000, "Closed")
	battery1.column[1].elevator[4] = NewElevator(5, 6, "Active", 1, 1000, "Closed")

	battery1.RequestElevator(Destination)
	fmt.Println("")
}

//Scenario2 Function
func Scenario2(battery2 Battery) {

	fmt.Println("")
	fmt.Println("Scenario 2:")
	fmt.Println("")

	Destination := 40

	battery2.column[2].elevator[0] = NewElevator(1, 1, "Active", 21, 1000, "Closed")
	battery2.column[2].elevator[1] = NewElevator(2, 23, "Active", 28, 1000, "Closed")
	battery2.column[2].elevator[2] = NewElevator(3, 33, "Active", 1, 1000, "Closed")
	battery2.column[2].elevator[3] = NewElevator(4, 40, "Active", 24, 1000, "Closed")
	battery2.column[2].elevator[4] = NewElevator(5, 39, "Active", 1, 1000, "Closed")

	battery2.RequestElevator(Destination)
	fmt.Println("")
}

//Scenario3 Function
func Scenario3(battery3 Battery) {

	fmt.Println("")
	fmt.Println("Scenario 3:")
	fmt.Println("")

	CurrentFloor := 54

	battery3.column[3].elevator[0] = NewElevator(1, 58, "Active", 1, 1000, "Closed")
	battery3.column[3].elevator[1] = NewElevator(2, 50, "Active", 60, 1000, "Closed")
	battery3.column[3].elevator[2] = NewElevator(3, 46, "Active", 58, 1000, "Closed")
	battery3.column[3].elevator[3] = NewElevator(4, 40, "Active", 24, 1000, "Closed")
	battery3.column[3].elevator[4] = NewElevator(5, 60, "Active", 1, 1000, "Closed")

	battery3.AssignElevator(CurrentFloor)
	fmt.Println("")
}

//Scenario4 Function
func Scenario4(battery4 Battery) {

	fmt.Println("")
	fmt.Println("Scenario 4:")
	fmt.Println("")

	CurrentFloor := -3

	battery4.column[0].elevator[0] = NewElevator(1, -4, "Inactive", -4, 1000, "Closed")
	battery4.column[0].elevator[1] = NewElevator(2, 1, "Inactive", 1, 1000, "Closed")
	battery4.column[0].elevator[2] = NewElevator(3, -3, "Active", -5, 1000, "Closed")
	battery4.column[0].elevator[3] = NewElevator(4, -6, "Active", 1, 1000, "Closed")
	battery4.column[0].elevator[4] = NewElevator(5, -1, "Active", -6, 1000, "Closed")

	battery4.AssignElevator(CurrentFloor)
	fmt.Println("")
}

// Testing Scenarios ---------------------------------------------------------------------------------------------------------------------
func main() {

	/*Scenario 1:
	  With second column (or column B) serving floors from 2 to 20, with elevator B1 at 20th floor going to 5th,
	  B2 at 3rd floor going to 15th, B3 at 13th floor going to 1st, B4 at 15th floor going to 2nd, and B5 at 6th floor going to 1st,
	  someone is at 1st floor and requests the 20th floor, elevator B5 is expected to be sent */

	battery1 := NewBattery(4, 66, 6)
	Scenario1(battery1)

	/* Scenario 2:
	With third column (or column C) serving floors from 21 to 40, with elevator C1 at 1st floor going to 21th,
	C2 at 23st floor going to 28th, C3 at 33rd floor going to 1st, C4 at 40th floor going to 24th, and C5 at 39nd floor going to 1st,
	someone is at 1st floor and requests the 36th floor, elevator C1 is expected to be sent */

	battery2 := NewBattery(4, 66, 6)
	Scenario2(battery2)

	/*Scenario 3:
	  With fourth column (or column D) serving floors from 41 to 60, with elevator D1 at 58th floor going to 1st,
	  D2 at 50th floor going to 60th, D3 at 46th floor going to 58th, D4 at 1st floor going to 54th, and D5 at 60th floor going to 1st,
	  someone is at 54th floor and requests the 1st floor, elevator D1 is expected to pick him up */

	battery3 := NewBattery(4, 66, 6)
	Scenario3(battery3)

	/*Scenario 4:
	   With first column (or Column A) serving the basements B1 to B6, with elevator A1 idle at B4, A2 idle at 1st floor,
	  A3 at B3 and going to B5, A4 at B6 and going to 1st floor, and A5 at B1 going to B6,
	  someone is at B3 and requests the 1st floor. Elevator A4 is expected to be sent. */

	battery4 := NewBattery(4, 66, 6)
	Scenario4(battery4)
}
