import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({isLike, onLikeClick}) {

  /*это временная заглушка, чтобы посмотреть, как будут отображаться карточки, полученные от api*/
  function getCardsTemporary() {
    let array = [];
    for (let i = 13; i < 29; i++) {
     array.push({id: i});
    }
    return array;
  }

  const cards = getCardsTemporary();

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        <ul className="movies-card-list__content-container">
          {cards.map((card, i) =>(
            <MoviesCard
              key = {card.id}
              isLike = {isLike}
              onLikeClick = {onLikeClick}
            />
          ))}
        </ul>
        <button className="movies-card-list__more-button">Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList;
