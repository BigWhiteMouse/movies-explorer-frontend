import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({onLikeClick, cards, nothingFound, showMore, onShowMore, onDelete}) {

  function handleShowMore() {
    onShowMore();
  }

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        {cards &&
        <ul className="movies-card-list__content-container">
          {cards.map((card, i) =>(
            <MoviesCard
              key = {card.id}
              card={card}
              onLikeClick = {onLikeClick}
              onDelete = {onDelete}
            />
          ))}
        </ul>}
        {nothingFound &&
          <p className="movies-card-list__nothing-found">Ничего не найдено</p>
        }
        {showMore &&
          <button className="movies-card-list__more-button" onClick={handleShowMore}>Ещё</button>
        }
      </div>
    </section>
  )
}

export default MoviesCardList;
