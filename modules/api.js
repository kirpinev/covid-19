export default class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  get(path) {
    return fetch(`${this.url}${path}`, {
      headers: this.headers
    })
      .then(this.checkStatus)
      .catch(this.showError);
  }

  checkStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  showError(err) {
    return console.log(err);
  }
}
