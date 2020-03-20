export default class Header {
  constructor(container, api) {
    this.container = container;
    this.api = api;
  }

  renderConfirmed() {
    this.countTotalConfirmed().then(
      total => (this.container.textContent = total)
    );
  }

  countTotalConfirmed() {
    return this.api
      .getAllData()
      .then(data =>
        data.reduce((result, country) => result + country.confirmed, 0)
      );
  }
}
