import React from 'react';
import MainTitle from "../MainTitle/MainTitle";

function Techs() {

  const techInfo = [{
    id: 6,
    name: 'HTML'
  }, {
    id: 7,
    name: 'CSS'
  }, {
    id: 8,
    name: 'JS'
  }, {
    id: 9,
    name: 'React'
  }, {
    id: 10,
    name: 'Git'
  }, {
    id: 11,
    name: 'Express.js'
  }, {
    id: 12,
    name: 'mongoDB'
  }];

  return (
    <section className="techs" id="techs">
      <MainTitle titleName="Технологии"/>
      <div className="techs__container">
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
          проекте.</p>
        <div className="techs__info-container">
          {techInfo.map((message, i) => (
            <div key={message.id} className="techs__info">{message.name}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Techs;
