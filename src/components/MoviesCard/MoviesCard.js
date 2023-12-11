import React from "react";
import { useLocation } from "react-router-dom";
import movieLike from "../../images/like.svg"
import movieLikeActive from "../../images/like-active.svg";
import deleteMovie from "../../images/delete-movie.svg";
import {MOVIES_BASE_URL} from "../../utils/consts";

function MoviesCard({onLikeClick, card, onDelete}) {

  const location = useLocation();

  const [saved, setIsSaved] = React.useState(card.saved);

  function handleLikeClick() {
    onLikeClick(card);
    setIsSaved(card.saved);
  }

  function getMoviesDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return (hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`)
  }

  function handleDelete() {
    onDelete(card);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <a href={card.trailerLink} target="_blank" rel="noopener noreferrer">
          <img className="movies-card__trailer" alt="Трейлер фильма"
               src={location.pathname === '/movies' ? MOVIES_BASE_URL+card.image.url : card.image}/>
        </a>
        <div className="movies-card__like-container">
          <p className="movies-card__name">{card.nameRU}</p>
          {location.pathname === '/movies' &&
            <button className="movies-card__button">
              <img className="movies-card__like"
                 alt="Лайк" src={saved ? movieLikeActive : movieLike} onClick={handleLikeClick}/>
            </button>}
          {location.pathname === '/saved-movies' &&
            <button className="movies-card__button" onClick={handleDelete}>
              <img className="movies-card__delete" alt="Иконка удаления фильма" src={deleteMovie}/>
            </button>}
        </div>
      </div>
      <p className="movies-card__duration">{getMoviesDuration(card.duration)}</p>
    </li>
  )
}

export default MoviesCard;
