import React from 'react';
import {Link, useLocation} from "react-router-dom";
import accountIcon from "../../images/profile.svg";
import closeBurgerIcon from "../../images/burger-close.svg";
import accountIconWhite from "../../images/profile-white.svg";

function Navigation({isBurgerOpened, onCloseBurgerClick, isLightTheme}) {

  const location = useLocation();

  function handleCloseBurgerClick() {
    onCloseBurgerClick();
  }

  return (
     <nav className={isBurgerOpened ? "navigation_burger" : "navigation"}>
       <div className={
         isBurgerOpened ?
            "navigation-container_burger"
           :
         isLightTheme ?
            "navigation-container navigation-container_theme_light"
           :
            "navigation-container"
       }>
         {isBurgerOpened && <img className="navigation__closeBurgerIcon" alt="Иконка закрытия бургера"
          src={closeBurgerIcon} onClick={handleCloseBurgerClick}/>}
         <div className={
           isBurgerOpened ?
              "navigation__movies-link-container_burger"
             :
              "navigation__movies-link-container"
         }>
           {isBurgerOpened &&
           <Link className={
             location.pathname === '/' ?
                "navigation__movies-link_burger navigation__movies-link_burger_active"
               :
                "navigation__movies-link_burger"}
           to="/">Главная</Link>}
           <Link className={
             isBurgerOpened && location.pathname ==='/movies' ?
                "navigation__movies-link_burger navigation__movies-link_burger_active"
               :
             isBurgerOpened ?
                "navigation__movies-link_burger"
               :
             isLightTheme && location.pathname ==='/movies' ?
                "navigation__movies-link navigation__movies-link_theme_light navigation__movies-link_active"
               :
             isLightTheme ?
                "navigation__movies-link navigation__movies-link_theme_light"
               :
                "navigation__movies-link"}
             to="/movies">Фильмы</Link>
           <Link className={
             isBurgerOpened && location.pathname ==='/saved-movies' ?
                "navigation__movies-link_burger navigation__movies-link_burger_active"
               :
             isBurgerOpened ?
                 "navigation__movies-link_burger"
               :
             isLightTheme && location.pathname ==='/saved-movies' ?
                 "navigation__movies-link navigation__movies-link_theme_light navigation__movies-link_active"
               :
             isLightTheme ?
                 "navigation__movies-link navigation__movies-link_theme_light"
               :
                 "navigation__movies-link"}
             to="/saved-movies">Сохранённые фильмы</Link>
         </div>
         <div className={isBurgerOpened ? "navigation__auth-container_burger" : "navigation__auth-container"}>
           <Link to="/profile">
             <img className={isBurgerOpened ? "navigation__account-icon_burger" : "navigation__account-icon"}
                  alt="Иконка аккаунта" src={isBurgerOpened || isLightTheme ? accountIconWhite : accountIcon}/>
           </Link>
         </div>
       </div>
     </nav>
  )
}

export default Navigation;
