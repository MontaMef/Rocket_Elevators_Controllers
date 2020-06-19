# Rocket_Elevators_Controllers

Odyssey Program /
Week 1 - Algorithms and Problem Solving /
This project is formed by the following documents: /
ReadME (The current document) /
Commercial_Controllers(Modern Solution).algo /
Commercial_Controllers(Classic Solution).algo /
Residential_Controllers.algo

----------------------------------------------------------------------------------------------------------------------------------------

# Commercial_Controllers(Modern Solution).algo

// BRIEF DESCRIPTION:

This algorithm is based on MODERN SOLUTION to serve users of elevators in Commercial and Corporate buildings. The following text 
explains this concept:
In the first floor there is a panel fixed outside elevators allowing user to demand the request floor by entering its number 
(so there is no need to fix a Call-Button in the first floor). The algorithm will do some calculations and display the best available 
elevator to take. The distribution of 12 elevators are done in 4 Columns. Each Column contains 3 elevators and each one serves an equal 
number of floors (excluding the first column wich serves only to go to the basement floors). This method allows system to reduce 
the waiting-time. To go back, User push Call-Button fixed outside elevators in each floor (excluding first floor) and the algorithm 
will find the best available elevator to take user back to the first floor.

Advantage: Reduce the waiting-time
Disadvantage: This algorithm does not allow users to use elevators in enetnd to go betwwen other floors. 
Instead, it serves only between first floor and demand floor or between current floor and first floor.

# Commercial_Controllers(Classic Solution).algo

# Residential_Controllers.algo

// BRIEF DESCRIPTION:

This algorithm is built to serve users of elevators in Residential building. The following text 
explains this concept:
In each floor there is a Call-Button fixed outside elevators, conatains two options UP or DOWN, allowing user to request the best 
available elevator. Inside each elevator there is a panel allowing user to choose the demand floor. In our case the building conatins 
10 floors. There is only one column which operates two elevators (elavator-1 and elevator-2).
To go back or to move to another floor, user follows alawyas the same procedure.

----------------------------------------------------------------------------------------------------------------------------------------

# SUMMARY
Each algorithm conatins the following summary

1- SEQUENCES OF ADDITIONAL REQUIREMENTS /
2- SEQUENCES OF ESSENTIALS REQUIREMENTS/
3- MAIN PROGRAM /
4- TESTING PROGRAM /








