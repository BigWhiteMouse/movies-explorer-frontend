import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login() {
  return(
    <AuthForm
      title="Рады видеть!"
      question="Ещё не зарегистрированы?"
      buttonText="Войти"
    />
  )
}

export default Login;
