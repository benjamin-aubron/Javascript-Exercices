
const form = document.querySelector("form");

form.addEventListener("submit", handleForm);

function handleForm (e){
  e.preventDefault();
  calculateCombinaison();
}

function factorial(n) {
  if (n<0){
    return false
  }
  else if (n == 0){
    return 1
  }
  else {
    return (n != 1) ? n * factorial(n - 1) : 1; // A réécrire
  }
}

function binomialCoefficient (k,n){
  return factorial(n)/(factorial(k)*factorial(n-k));
}


const result = document.querySelector("span");
const inputs = document.querySelector("input");


function calculateCombinaison() {
  
  const element = [];
  for (let i = 0; i <= inputs.value-1; i++) {
    element.push(binomialCoefficient(i,inputs.value));
  }
  console.log(element);
  console.log("Somme "+ element.reduce((a, b) => a + b, 0));
  
  result.textContent =element.reduce((a, b) => a + b, 0);
};









