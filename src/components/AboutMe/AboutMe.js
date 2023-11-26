import React from 'react';
import MainTitle from "../MainTitle/MainTitle";
import landingFoto from "../../images/student-foto.jpg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {

  return (
    <section className="about-me">
      <MainTitle titleName="Студент"/>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__title">Ксения</h3>
          <h4 className="about-me__subtitle">Фронтенд-разработчик, 34 года</h4>
          <p className="about-me__text">Я родилась в Москве, сейчас живу в Ташкенте. Раньше работала тестировщиком, в 2023
            году решила повысить квалификацию, и теперь занимаюсь веб-разработкой.</p>
          <a
            className="about-me__link"
            href="https://github.com/BigWhiteMouse"
            target="_blank"
            rel="noopener noreferrer"
          >Github</a>
        </div>
        <img alt="Фото студента" src={landingFoto} className="about-me__foto"/>
      </div>
      <Portfolio/>
    </section>
  )
}

export default AboutMe ;
