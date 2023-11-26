import React from 'react';
import landingLogo from "../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div>
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img alt="Промо картинка" src={landingLogo} className={"promo__picture"}/>
      </div>
      <button className="promo__button">
        <a href="#techs" className="promo__link">Узнать больше</a>
      </button>
    </section>
  )
}

export default Promo;
