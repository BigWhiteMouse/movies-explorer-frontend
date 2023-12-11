export default class Api {
  constructor(path) {
    this.path = path;
  }

  getResult(res) {
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(res.json().then(r => r.message));
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
    }
  }
}
