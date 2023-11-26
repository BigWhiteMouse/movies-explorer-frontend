import React from 'react';
import landingArrow from "../../images/landing-arrow.svg";

function Portfolio() {

  const techInfo = [{
    id: 3,
    name: 'Статичный сайт',
    link: 'https://github.com/BigWhiteMouse/how-to-learn',
    hasLine: true,
  }, {
    id: 4,
    name: 'Адаптивный сайт',
    link: 'https://github.com/BigWhiteMouse/russian-travel',
    hasLine: true,
  }, {
    id: 5,
    name: 'Одностраничное приложение',
    link: 'https://github.com/BigWhiteMouse/react-mesto-api-full-gha',
    hasLine: false
  }];

  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__info-container">
          {techInfo.map((message, i) => (
            <li className="portfolio__link-container">
              <div className={message.hasLine ? "portfolio__link-arrow-container portfolio__link-arrow-container_line" :
                "portfolio__link-arrow-container"}>
                <a
                  key={message.id}
                  className="portfolio__link"
                  href={message.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >{message.name}</a>
                <img alt="Иконка стрелка" src={landingArrow} className="portfolio__arrow"/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;
