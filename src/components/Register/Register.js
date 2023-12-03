import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register() {
  return(
    <AuthForm
      title="Добро пожаловать!"
      question="Уже зарегистрированы?"
      buttonText="Зарегистрироваться"
      isRegisterPage
    />
  )
}

export default Register;
