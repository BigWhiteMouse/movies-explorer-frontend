import React from "react";

function SearchForm() {
  return (
    <form className="search-form" name="search-form">
      <div className="search-form__container">
        <input type="text" className="search-form__input" placeholder="Фильм" name="search-input" required/>
        <button className="search-form__button">Найти</button>
      </div>
      <div className="search-form__checkbox-container">
        <label className="search-form__checkbox-switch">
          <input type="checkbox" className="search-form__checkbox" name="search-checkbox" value="check" defaultChecked/>
          <span className="search-form__checkbox-slider"/>
        </label>
        <span className="search-form__short-movies-span">Короткометражки</span>
      </div>
    </form>
  )
}

export default SearchForm;
