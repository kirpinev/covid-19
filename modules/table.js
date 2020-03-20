export default class Table {
  constructor(container, api) {
    this.container = container;
    this.api = api;
  }

  render(quantity) {
    this.filterByConfirmed().then(data => {
      data
        .slice(0, quantity)
        .map(item => {
          return `
            <tr class="table__row">
                <td class="table__data">${item.countryRegion}</td>
                <td class="table__data">${item.confirmed}</td>
                <td class="table__data">${item.deaths}</td>
                <td class="table__data">${item.recovered}</td>
            </tr>
        `;
        })
        .forEach(row => {
          this.container.insertAdjacentHTML("beforeend", row);
        });
    });
  }

  filterByConfirmed() {
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

      return Object.values(country);
    });
  }
}
