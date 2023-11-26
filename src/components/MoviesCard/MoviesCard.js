import React from "react";
import { useLocation } from "react-router-dom";
import movieTrailer from "../../images/movie-picture.png";
import movieLike from "../../images/like.svg"
import movieLikeActive from "../../images/like-active.svg";
import deleteMovie from "../../images/delete-movie.svg";

function MoviesCard({isLike, onLikeClick}) {

  const location = useLocation();

  function handleLikeClick() {
    onLikeClick();
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <img className="movies-card__trailer" alt="Трейлер фильма" src={movieTrailer}/>
        <div className="movies-card__like-container">
          <p className="movies-card__name">33 слова о дизайне</p>
          {location.pathname === '/movies' &&
            <img className="movies-card__like"
               alt="Лайк" src={isLike ? movieLikeActive : movieLike} onClick={handleLikeClick}/>}
          {location.pathname === '/saved-movies' &&
            <img className="movies-card__delete" alt="Иконка удаления фильма" src={deleteMovie}/>}
        </div>
      </div>
      <p className="movies-card__duration">1ч42м</p>
    </li>
  )
}

export default MoviesCard;
