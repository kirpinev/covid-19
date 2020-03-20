import Api from "./modules/api.js";
import Lead from "./modules/lead.js";
import Header from "./modules/header.js";
import Table from "./modules/table.js";

const api = new Api({
  url: "https://covid19.mathdro.id/api"
});

const lead = new Lead(document.querySelector(".total__number"), api);

const header = new Header(document.querySelector(".header__total"), api);

const table = new Table(document.querySelector(".table"), api);

lead.renderConfirmed("/confirmed");

header.renderConfirmed("/confirmed");

table.render("/confirmed", 10);
