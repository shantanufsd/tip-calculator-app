const headerElement = document.querySelector(".header");
const billAmount = document.querySelector("#bill-amount");
const customTip = document.querySelector("#custom-tip");
const totalPeoples = document.querySelector("#total-peoples");
const tipPerPerson = document.querySelector("#tip-per-person");
const tipTotalPerPerson = document.querySelector("#tip-total-per-person");
const billMsg = document.querySelectorAll(".bill-msg");
const tipButtons = document.querySelectorAll(".tip-button");
const resetBtn = document.querySelector(".reset-btn");
const errorMessage = document.querySelectorAll(".error-message");

const pageTitle = headerElement.innerHTML;
const PageTitleUpperCase = pageTitle.toUpperCase();
const firstHalfOfTitle = PageTitleUpperCase.slice(0, 4);
const secondHalfOfTitle = PageTitleUpperCase.slice(4);
const outputString = `<span class="first-half">${firstHalfOfTitle}</span><span class="second-half">${secondHalfOfTitle}</span>`;
headerElement.innerHTML = outputString;

let totalAmount;
let tip;
let peoples;

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

function amountPerPerson(bill, tip, peoples) {
  if(bill && tip && peoples){
    const tipConvert = tip / 100;
    const totalTip = (bill * tipConvert) / peoples;
    return bill / peoples + totalTip;
  }
}


function tipAmountPerPerson(bill, tip, peoples) {
  if(bill && tip && peoples) {
    const tipConvert = tip / 100;
    return (bill * tipConvert) / peoples;
  }

}

function displayValue() {
  const result = tipAmountPerPerson(totalAmount, tip, peoples);
  if(result !== undefined && !isNaN(result)){
    tipPerPerson.innerHTML = "$" + result.toFixed(2);
  }
  const result2 = amountPerPerson(totalAmount, tip, peoples);
  if(result2 !== undefined && !isNaN(result2)){
    tipTotalPerPerson.innerHTML = "$" + result2.toFixed(2);
  }

}

function checkValid(){
  if(totalAmount>999999){
    totalAmount = 999999;
  }else if(tip>100){
    tip = 100;
  }
  return true;
}

function errorMessageCreate(){
  for(let i=0; i<billMsg.length; i++ ){
    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = "can't be zero";
    errorMessage.classList.add("error-message");
    billMsg[i].appendChild(errorMessage);
  }
}
errorMessageCreate();

function updateErrorMsg(inputElement){
  if(inputElement.value === "" || inputElement.value === "0"){
    inputElement.classList.add("error-alert");
    inputElement.nextElementSibling.style.display = "block";
  } else {
    inputElement.classList.remove("error-alert");
    inputElement.nextElementSibling.style.display = "none";
  }
}

function resetValue(){
  totalAmount = "";
  tip = "";
  peoples = "";
  customTip.value = "";
  tipPerPerson.innerHTML = "$0.00";
  tipTotalPerPerson.innerHTML = "$0.00";
  billAmount.value="";
  totalPeoples.value="";
  billAmount.classList.remove("error-alert");
  totalPeoples.classList.remove("error-alert");
  billAmount.nextElementSibling.style.display = "none";
  totalPeoples.nextElementSibling.style.display = "none";
  tipButtons.forEach(btn => btn.classList.remove('btn-click'));
  resetBtn.disabled = true;
}

resetBtn.addEventListener("click", resetValue);

billAmount.oninput = (event) => {
  totalAmount = parseFloat(event.target.value);
  if (checkValid()) {
    displayValue();
  }
  updateErrorMsg(event.target);
  resetBtn.disabled = false;
};

customTip.oninput = (event) => {
  tipButtons.forEach(btn => btn.classList.remove('btn-click'));
  tip = parseInt(event.target.value);
  if (checkValid()) {
    displayValue();
  }
  resetBtn.disabled = false;
};

customTip.addEventListener('focus', () => {
  tipButtons.forEach(btn => btn.classList.remove('btn-click'));
});

tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    customTip.value = "";
    tipButtons.forEach(btn => btn.classList.remove('btn-click'));
    button.classList.add("btn-click");
    tip = parseInt(button.textContent);
    if (checkValid()) {
      displayValue();
    }
    resetBtn.disabled = false;
  });
});


totalPeoples.oninput = (event) => {
  peoples = parseInt(event.target.value);
  if (checkValid()) {
    displayValue();
  }
  updateErrorMsg(event.target);
  resetBtn.disabled = false;
};


