import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({isLike, onLikeClick, onSearch, cards, onCheck, nothingFound, isSearchInProgress, showMore,
                  onShowMore}) {

  const searchValue = localStorage.getItem('searchValue')?.replaceAll('"', '');

  function getCheckedValue() {
    let checked = localStorage.getItem('isChecked');
    return checked === 'true';
  }

  function setCheckedValue(e) {
    localStorage.setItem('isChecked', e.target.checked);
  }

  return (
    <section className="movies">
      <SearchForm
        onSearch = {onSearch}
        onCheck = {onCheck}
        searchValue = {searchValue}
        getCheckedValue = {getCheckedValue}
        setCheckedValue = {setCheckedValue}
      />
      {isSearchInProgress && <Preloader/>}
      <MoviesCardList
        isLike = {isLike}
        onLikeClick = {onLikeClick}
        cards = {cards}
        nothingFound={nothingFound}
        showMore = {showMore}
        onShowMore = {onShowMore}
      />
    </section>
  )
}

export default Movies;
