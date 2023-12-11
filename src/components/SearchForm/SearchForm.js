import React from "react";

function SearchForm({onSearch, onCheck, searchValue, getCheckedValue, setCheckedValue}) {

  const [query, setQuery] = React.useState(searchValue || '');
  const [isChecked, setChecked] = React.useState(getCheckedValue || false);
  const [isValid, setIsValid] = React.useState(true);

  function handleSearchSubmit(e) {
    const target = e.target;
    setIsValid(target.closest("form").checkValidity());
    if (!isValid) return;
    e.preventDefault();
    onSearch(query, isChecked);
  }

  function handleQueryChange(e) {
    e.preventDefault();
    setQuery(e.target.value);
    setIsValid(true);
  }

  function handleCheck(e) {
    setCheckedValue(e);
    setChecked(e.target.checked);
    onCheck(e.target.checked);
  }

  return (
    <form className="search-form" name="search-form" onSubmit={handleSearchSubmit} noValidate>
      <div className="search-form__container">
        <input type="text" minLength='1' className="search-form__input" placeholder="Фильм" name="search-input" required
        onChange={handleQueryChange} value={query}/>
        <button className="search-form__button">Найти</button>
      </div>
      <p className={isValid ? "search-form__error" : "search-form__error search-form__error_visible"}>
        Необходимо заполнить форму поиска</p>
      <div className="search-form__checkbox-container">
        <label className="search-form__checkbox-switch">
          <input type="checkbox" className="search-form__checkbox" name="search-checkbox"
                 defaultChecked={isChecked} onChange={handleCheck} />
          <span className="search-form__checkbox-slider"/>
        </label>
        <span className="search-form__short-movies-span">Короткометражки</span>
      </div>
    </form>
  )
}

export default SearchForm;
