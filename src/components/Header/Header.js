import React from 'react';
import { Link } from "react-router-dom";
import headerLogo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";
import burgerIcon from "../../images/burger-icon.svg";
import burgerIconBlack from "../../images/burger-icon-black.svg";

function Header({onBurgerLinkClick, isBurgerOpened, onCloseBurgerClick, isLightTheme}) {

  function handleBurgerLinkClick() {
    onBurgerLinkClick();
  }

  function handleCloseBurgerClick() {
    onCloseBurgerClick()
  }

  return (
    <header className={isLightTheme ? "header header_theme_light" : "header"}>
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" alt="Логотип проекта" src={headerLogo}/>
        </Link>
        <Navigation
          isBurgerOpened={isBurgerOpened}
          onCloseBurgerClick={handleCloseBurgerClick}
          isLightTheme={isLightTheme}
        />
        <div className="header__burger-link" onClick={handleBurgerLinkClick}>
          <img className="header__burger-icon" alt="Иконка бургер" src={isLightTheme ? burgerIconBlack : burgerIcon}/>
        </div>
        {/*в последствии это будет работать по стейту isLoggedIn
        <nav className="header__navigation">
          <Link to="/signup">
              <button className="header__register-button">Регистрация</button>
          </Link>
          <Link to="/signin">
             <button className="header__login-button">Войти</button>
          </Link>
        </nav>*/}
      </div>
    </header>
  )
}

export default Header;
