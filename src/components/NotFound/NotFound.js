import React from "react";
import { useNavigate } from 'react-router-dom';


function NotFound() {

  const navigate = useNavigate();

  function handleGoBackClick() {
    navigate(-1);
  }

  return(
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <p className="not-found__link" onClick={handleGoBackClick}>Назад</p>
    </section>
  )
}

export default NotFound;
