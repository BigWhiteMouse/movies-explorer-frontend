import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login({onSubmit, loginValue, setLoginValue}) {
  return(
    <AuthForm
      title="Рады видеть!"
      question="Ещё не зарегистрированы?"
      buttonText="Войти"
      onSubmit = {onSubmit}
      authValue = {loginValue}
      setAuthValue = {setLoginValue}
    />
  )
}

export default Login;
