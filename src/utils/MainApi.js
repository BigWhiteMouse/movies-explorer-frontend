import {MAIN_PATH} from './consts.js';
import Api from "./Api";

class MainApi extends Api {
  constructor(path) {
    super(path);
  }

  register(email, password, name) {
    return fetch(`${this.path}signup`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({email, password, name}),
    }).then(this.getResult);
  }

  login(email, password) {
    return fetch(`${this.path}signin`, {
      method: "POST",
      credentials: "include",
      headers: this.getHeaders(),
      body: JSON.stringify({email, password}),
    }).then(this.getResult);
  }

  signout() {
    return fetch(`${this.path}signout`, {
      method: "GET",
      credentials: "include",
      headers: this.getHeaders()
    }).then(this.getResult);
  }

  checkUser() {
    return fetch(`${this.path}users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this.getHeaders()
    }).then(this.getResult);
  }

  updateProfile(name, email) {
    return fetch(`${this.path}users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this.getHeaders(),
      body: JSON.stringify({name, email}),
    }).then(this.getResult);
  }

  getCards() {
    return fetch(`${this.path}movies`, {
      method: "GET",
      credentials: "include",
      headers: this.getHeaders(),
    }).then(this.getResult);
  }

  createCard(body) {
    return fetch(`${this.path}movies`, {
      method: "POST",
      credentials: "include",
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    }).then(this.getResult);
  }

  deleteCard(id) {
    return fetch(`${this.path}movies/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this.getHeaders(),
    }).then(this.getResult);
  }

}

const mainApi = new MainApi(MAIN_PATH);

export default mainApi;
