import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({isLike, onLikeClick}) {
  return (
    <section className="movies">
      <SearchForm/>
      {/*<Preloader/>*/}
      <MoviesCardList
        isLike = {isLike}
        onLikeClick = {onLikeClick}
      />
    </section>
  )
}

export default Movies;
