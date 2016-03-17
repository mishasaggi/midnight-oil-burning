/*
Problem 1: Multiples of 3 and 5
If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. 
The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.
*/

function findMultiples() {
  //find all multiples of 3 and 5 with upper limit 1000
  var number = 0;
  for( var number = 999; number > 0; number-- ) {
    if( number % 3 === 0 || number % 5 === 0 ) {
      result += number;
    }
  }
  return result;
  //find sum of the above multiples
}
