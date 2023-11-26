import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__text-container">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        </div>
        <div className="footer__content-container">
          <p className="footer__copyright">&copy; 2023</p>
          <div className="footer__copyright-container">
            <p className="footer__copyright">Яндекс.Практикум</p>
            <p className="footer__copyright">Github</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
