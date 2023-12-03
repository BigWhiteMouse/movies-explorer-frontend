import React from "react";
import { Link } from "react-router-dom";
import mainPageLogo from "../../images/logo.svg";

function AuthForm({title, question, buttonText, isRegisterPage}) {
  return (
    <section className="auth-form">
      <Link to="/">
        <img className="auth-form__logo" alt="Логотип проекта" src={mainPageLogo}/>
      </Link>
      <h2 className="auth-form__title">{title}</h2>
      <form name="auth-form" className="auth-form__form">
        {isRegisterPage &&
        <label className="auth-form__label">
          <span className="auth-form__text">Имя</span>
          <input type="text" className="auth-form__input" name="email" required/>
        </label>
        }
        <label className="auth-form__label">
          <span className="auth-form__text">E-mail</span>
          <input type="email" className="auth-form__input" name="email" required/>
        </label>
        <label className="auth-form__label">
          <span className="auth-form__text">Пароль</span>
          <input type="password" className="auth-form__input" name="password" required/>
          <span className="auth-form__error">Что-то пошло не так...</span>
        </label>
        <button className={isRegisterPage? "auth-form__button auth-form__button_register" : "auth-form__button"}>
          {buttonText}</button>
      </form>
      <p className="auth-form__link-container">{question}
        {isRegisterPage ?
          <Link to="/signin" className="auth-form__link"> Войти</Link>
         :
          <Link to="/signup" className="auth-form__link"> Регистрация</Link>
        }
      </p>
    </section>
  )
}

export default AuthForm;
