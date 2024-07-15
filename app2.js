// API link
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

//selection elements 
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
//to get the selected country from the corrency conversion
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
//to display the final amount 
const msg = document.querySelector(".msg");

//to get the default conversion rate when the document load for the first time
document.addEventListener("load", () => {
    updateExchangeRate();
});


// for adding country list in the droplist 
for (let select of dropdowns) {
    for (currCode in countryList) {
        // console.log(code, countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        // to disply USD in from section
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target); 
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    //to reset the amount to 1 if its blank of a minus value
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    // to update the link according to the country selected
    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL); 
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(rate );

    let finalAmount = amotVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr}`
}

const updateFlag = (element) => {
    // console.log(element);
    let currCode = element.value; 
    // console.log(currCode);
    let countryCode = countryList[currCode]; //IN, EU 
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


//to get the amount from the input box
btn.addEventListener("click", (evt) => {
    //to remove the default working of the button ex. clicking the btn refreshes the page
    evt.preventDefault();
    updateExchangeRate(); 
});


//to get the default conversion rate when the document load for the first time
window.addEventListener("load", () => {
    updateExchangeRate();
}); 


// refer chatgpt for the solution