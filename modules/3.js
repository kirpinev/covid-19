import { data } from "./data.js";

const topThree = data
  .filter(item => item.confirmed > 100)
  .sort(
    (a, b) => (a.confirmed / a.deaths) * 100 - (b.confirmed / b.deaths) * 100
  )
  .slice(0, 3);

const diagram = document.querySelector(".diagram");

const createRow = (name, confirmed, death, recovered) => {
  let deathConfirmed = (death / confirmed) * 100,
    recoveredConfirmed = (recovered / confirmed) * 100;

  return `
    <div class="diagram__row">
            <div class="diagram__caption">
              <p class="diagram__country">${name}</p>
              <p class="diagram__analytics">
                Смертность
                <span class="diagram__data diagram__data_type_dead">${deathConfirmed.toFixed(
                  2
                )}%</span>
                • Вылечилось
                <span class="diagram__data diagram__data_type_healed"
                  >${recoveredConfirmed.toFixed(2)}%</span
                >
              </p>
            </div>
            <div class="diagram__line">
              <div
                class="diagram__visualisation diagram__visualisation_type_healed"
                style="width: ${recoveredConfirmed.toFixed(2)}%;"
              ></div>
              <div
                class="diagram__visualisation diagram__visualisation_type_dead"
                style="width: ${deathConfirmed.toFixed(2)}%;"
              ></div>
            </div>
          </div>
    `;
};

for (let country of topThree) {
  diagram.insertAdjacentHTML(
    "beforeend",
    createRow(
      country.countryRegion,
      country.confirmed,
      country.deaths,
      country.recovered
    )
  );
}
