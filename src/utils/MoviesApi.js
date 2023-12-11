import {MOVIES_PATH} from './consts.js';
import Api from "./Api";

class MoviesApi extends Api {
  constructor(path) {
    super(path);
  }

  getMovies() {
    return fetch(`${this.path}`, {
      headers: this.getHeaders()
    }).then(this.getResult);
  }
}

const moviesApi = new MoviesApi(MOVIES_PATH);

export default moviesApi;
