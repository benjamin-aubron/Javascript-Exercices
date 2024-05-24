const BMIData = [
  {name:"Maigreur", color:"midnightblue", range:[0,18.5]},
  {name:"Bonne santé", color:"green", range:[18.5,25]},
  {name:"Surpoids", color:"lightcoral", range:[25,30]},
  {name:"Obésité modérée", color:"orange", range:[30,35]},
  {name:"Obésité sévère", color:"crimson", range:[35,40]},
  {name:"Obésité morbide", color:"purple", range:40},
]

const form = document.querySelector("form")

form.addEventListener("submit", handleForm)

function handleForm(e) {
  e.preventDefault();
  calculateBMI();
}

const inputs = document.querySelectorAll("input")

function calculateBMI() {
  const height = inputs[0].value;
  const weight = inputs[1].value;
 
  if (!height || !weight || height <= 0 || weight <= 0)  {
    handleError()
    return;
  }

  const BMI = (weight / Math.pow(height/100, 2)).toFixed(1)

  showResult(BMI);
}

const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result");


function handleError(){
  displayBMI.textContent = "Wops"
  displayBMI.style.color = "inherit"
  result.textContent = "Remplisser correctement les inputs"

}

function showResult(BMI){
  const rank = BMIData.find(object =>{
    if (BMI >= object.range[0] && BMI < object.range[1]) return object;
    else if (typeof object.range === "number" && BMI >= object.range) return object;
  })

  displayBMI.textContent = BMI;
  displayBMI.style.color = `${rank.color}`;
  result.textContent = `${rank.name}`
}