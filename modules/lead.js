export default class Lead {
  constructor(container, api) {
    this.container = container;
    this.api = api;
  }

  renderConfirmed() {
    this.api.getAllData().then(data => {
      let total = 0;

      for (let country of data) {
        total += country.confirmed;
      }

      this.container.textContent = total;
    });
  }
}
