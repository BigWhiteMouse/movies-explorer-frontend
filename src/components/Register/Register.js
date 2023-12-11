import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register({onSubmit, registerValue, setRegisterValue}) {

  return(
    <AuthForm
      title="Добро пожаловать!"
      question="Уже зарегистрированы?"
      buttonText="Зарегистрироваться"
      isRegisterPage
      onSubmit = {onSubmit}
      authValue = {registerValue}
      setAuthValue = {setRegisterValue}
    />
  )
}

export default Register;
