export default class Diagram {
  constructor(container, api) {
    this.container = container;
    this.api = api;
  }

  render(quantity) {
    this.filterByDeath().then(data => {
      data
        .slice(0, quantity)
        .map(item => {
          let deathConfirmed = (item.deaths * 100) / item.confirmed,
            recoveredConfirmed = (item.recovered * 100) / item.confirmed,
            name = item.countryRegion;

          return `
    <div class="diagram__row">
            <div class="diagram__caption">
              <p class="diagram__country">${name}</p>
              <p class="diagram__analytics">
                Смертность
                <span class="diagram__data diagram__data_type_dead">${deathConfirmed.toFixed(
                  2
                )}%</span>
                | Вылечилось
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
        })
        .forEach(row => {
          this.container.insertAdjacentHTML("beforeend", row);
        });
    });
  }

  filterByDeath() {
    return this.api.getAllData().then(data => {
      const country = data.reduce((res, item) => {
        const { countryRegion, confirmed, deaths, recovered } = item;

        if (!res[countryRegion]) {
          res[countryRegion] = {
            countryRegion,
            confirmed,
            deaths,
            recovered
          };
          return res;
        }
        res[countryRegion].confirmed += confirmed;
        res[countryRegion].deaths += deaths;
        res[countryRegion].recovered += recovered;
        return res;
      }, {});

      return Object.values(country)
        .filter(deaths => deaths.confirmed > 100)
        .sort(
          (a, b) =>
            (a.confirmed / a.deaths) * 100 - (b.confirmed / b.deaths) * 100
        );
    });
  }
}
