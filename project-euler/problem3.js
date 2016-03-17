/*
Problem 3: Largest prime factor
The prime factors of 13195 are 5, 7, 13 and 29.
What is the largest prime factor of the number 600851475143 ?
*/
function largestPrimeFactor(){
  var dividend = 600851475143,
      factors = [];
      //exception 17 x 3

 function isPrime(n) {
  var checkUnderNumber = Math.ceil(Math.sqrt(n));
  if (n <= 1) return false;
  else if ((n !==2 ) && (n%2 === 0)) return false;
  else if ((n !==3 ) && (n%3 === 0)) return false;
  for(var divisor=checkUnderNumber; divisor>2; divisor--){
    if(n%divisor===0) return false;
    }
    return true;
  }

  for(var divisor=0; divisor<=Math.sqrt(600851475143); divisor++){
    if( dividend%divisor === 0 ) {
      if ( isPrime(divisor) ) {
        factors.push(divisor);
      }
    }
  }
  console.log(factors);

}
