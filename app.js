const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const currDrpdown = document.querySelectorAll(".from-to-container select");
let output = document.querySelector(".output");
let cvtBtn = document.querySelector(".cvt-btn");
let amount = document.querySelector(".input-container input");
let fromCurr = document.querySelector("#from select");
let toCurr = document.querySelector("#to select");

 // To set Dropdown Values
for (let select of currDrpdown){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.className === "from-drpdwn" && currCode === "USD"){
            newOption.selected = "selected";
        } else if (select.className === "to-drpdwn" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
         updateFlag(evt.target);
    })
}
//  To update Flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateCurrency = async () => {
    let amountVal = amount.value;
    console.log(amount.value);
    if (amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = 1;
    }
    console.log(fromCurr.value,toCurr.value);
    const url = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const response = await fetch(url);
    const data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);
    let res = amountVal * rate;
    output.innerText = `${amountVal} ${fromCurr.value} = ${Math.round(res)} ${toCurr.value}`;
};

// Convert Button
cvtBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateCurrency();
});
window.addEventListener("load",() => {
    updateCurrency();
}); 