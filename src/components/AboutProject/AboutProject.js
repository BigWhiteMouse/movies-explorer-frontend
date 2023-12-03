import React from 'react';
import MainTitle from "../MainTitle/MainTitle";

function AboutProject() {

  const aboutProjectInfo = [{
    id: 1,
    title: 'Дипломный проект включал 5 этапов',
    text: 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
  }, {
    id: 2,
    title: 'На выполнение диплома ушло 5 недель',
    text: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
    isLeft: true
  }];

  return (
    <section className="about-project">
      <div className="about-project__container">
        <MainTitle titleName="О проекте"/>
        <div className="about-project__info-container">
          {aboutProjectInfo.map((message, i) => (
            <div key={message.id} className="about-project__info">
              <h3 className={message.isLeft ? "about-project__title about-project__title_left" : "about-project__title"}
              >{message.title}</h3>
              <p className={message.isLeft ? "about-project__text about-project__text_left" : "about-project__text"}
              >{message.text}</p>
            </div>
          ))}
        </div>
        <div className="about-project__time-container">
          <div className="about-project__backend-time">
            <div className="about-project__time about-project__time_backend">1 неделя</div>
            <span className="about-project__clarification">Back-end</span>
          </div>
          <div className="about-project__frontend-time">
            <div className="about-project__time">4 недели</div>
            <span className="about-project__clarification">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
