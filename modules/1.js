import { data } from "./data.js";

let sum = 0,
  totalNumber = document.querySelector(".total__number"),
  headerTotal = document.querySelector(".header__total");

for (let country of data) {
  sum += country.confirmed;
}

totalNumber.textContent = sum;
headerTotal.textContent = sum;
