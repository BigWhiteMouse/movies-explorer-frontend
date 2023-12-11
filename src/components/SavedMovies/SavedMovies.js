import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({cards, onDelete, onSearch, onCheck, searchValue, nothingFound, getCheckedValue, setCheckedValue}) {
  return (
    <section className="movies">
      <SearchForm
        onSearch = {onSearch}
        onCheck = {onCheck}
        searchValue = {searchValue}
        getCheckedValue = {getCheckedValue}
        setCheckedValue = {setCheckedValue}
      />
      {/*<Preloader/>*/}
      <MoviesCardList
        cards={cards}
        onDelete = {onDelete}
        nothingFound={nothingFound}
      />
    </section>
  )
}

export default SavedMovies;
