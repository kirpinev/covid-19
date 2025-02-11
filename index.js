import Api from "./modules/api.js";
import Lead from "./modules/lead.js";
import Header from "./modules/header.js";
import Table from "./modules/table.js";
import Diagram from "./modules/diagram.js";

const api = new Api({
  url: "https://covid19.mathdro.id/api"
});

const lead = new Lead(document.querySelector(".total__number"), api);

const header = new Header(document.querySelector(".header__total"), api);

const table = new Table(document.querySelector(".table"), api);

const diagram = new Diagram(document.querySelector(".diagram"), api);

lead.render();

header.render();

table.render(10);

diagram.render(5);

window.addEventListener("scroll", () => {
  if (pageYOffset > 100) {
    document.querySelector(".page__header").style.top = "0";
  } else {
    document.querySelector(".page__header").style.top = "-60px";
  }
});
