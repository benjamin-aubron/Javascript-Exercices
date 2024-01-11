

const form = document.querySelector("form");

form.addEventListener("submit", handleForm);

function handleForm (e){

  e.preventDefault();
  calculateCombinaison();

}

function factorial(n) {
  if{n < 0 ;}
  return (n != 1) ? n * factorial(n - 1) : 1;
}


function binomialCoefficient (k,n){
  return factorial(n)/(factorial(k)*factorial(n-k));
}


const result = document.querySelector("span");
const inputs = document.querySelector("input");

console.log(result.textContent)
console.log(inputs.value)


function calculateCombinaison() {
  
  const element = [];
  for (let i = 0; i <= inputs.value-1; i++) {
    element.push(i**9);
    // element.push(factorial(i));
    console.log(factorial(0));
  }
  // console.log(element);
  // console.log(element.reduce((a, b) => a + b, 0));
  
  result.textContent =element.reduce((a, b) => a + b, 0);
};





console.log(binomialCoefficient(3,4))


console.log(factorial(6))