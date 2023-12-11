import React from "react";
import { Link } from "react-router-dom";
import mainPageLogo from "../../images/logo.svg";

function AuthForm({title, question, buttonText, isRegisterPage, onSubmit, authValue,
                    setAuthValue}) {

  const [isValid, setIsValid] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [isValidEmail, setIsValidEmail] = React.useState(true);

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    setAuthValue({
      ...authValue,
      [name]: value,
    });
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    if (name === 'email' && !target.value.match(isValidEmail)) {
      setErrors({...errors, [name]: 'Адрес электронной почты должен содержать домент первого уровня'});
      setIsValidEmail(false);
    }
    else setIsValidEmail(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(e)
  }

  return (
    <section className="auth-form">
      <Link to="/">
        <img className="auth-form__logo" alt="Логотип проекта" src={mainPageLogo}/>
      </Link>
      <h2 className="auth-form__title">{title}</h2>
      <form name="auth-form" className="auth-form__form" onSubmit={handleSubmit} noValidate>
        {isRegisterPage &&
        <label className="auth-form__label">
          <span className="auth-form__text">Имя</span>
          <input type="text" minLength="2" maxLength='30' className="auth-form__input" name="name" required
                 onChange={handleChange} value={authValue?.name}/>
          <p className={errors.name ? 'auth-form__error auth-form__error_visible' : 'auth-form__error'}>{errors.name}</p>
        </label>
        }
        <label className="auth-form__label">
          <span className="auth-form__text">E-mail</span>
          <input type="email" className="auth-form__input" name="email" required
                 onChange={handleChange} value={authValue?.email}/>
          <p className={errors.email ? 'auth-form__error auth-form__error_visible' : 'auth-form__error'}>{errors.email}</p>
        </label>
        <label className="auth-form__label">
          <span className="auth-form__text">Пароль</span>
          <input type="password" className="auth-form__input" name="password"
                 onChange={handleChange} value={authValue?.password} required/>
          <p className={errors.password ? 'auth-form__error auth-form__error_visible' : 'auth-form__error'}>{errors.password}</p>
        </label>
        <button className={
          isRegisterPage && isValid && isValidEmail ?
            "auth-form__button auth-form__button_active auth-form__button_register"
            :
          isRegisterPage && (!isValid || !isValidEmail) ?
            "auth-form__button auth-form__button_register"
            :
          isValid && isValidEmail ?
            "auth-form__button auth-form__button_active"
            :
            "auth-form__button"
        }>
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
