import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <section className="movies">
      <SearchForm/>
      {/*<Preloader/>*/}
      <MoviesCardList/>
    </section>
  )
}

export default SavedMovies;
